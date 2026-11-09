<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const mountEl = ref(null)
const fallback = ref(false)

let scene, camera, renderer, bottleGroup, capGroup, frameId = 0
let isVisible = true
let isDisposed = false
let progress = 0
let intersectionObserver
let resizeObserver
let lastWidth = 0
let lastHeight = 0
let onScroll = () => {}
let onResize = () => {}
const capsules = []
const ownedTextures = []
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const smooth = t => t * t * (3 - 2 * t)

function createLabelTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 720
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fbfcfa'
  ctx.fillRect(0, 0, 1024, 720)
  ctx.fillStyle = '#c9ad67'
  ctx.fillRect(0, 0, 1024, 12)
  ctx.fillStyle = '#0a493b'
  ctx.fillRect(0, 500, 1024, 220)
  ctx.fillStyle = '#b99b49'
  ctx.fillRect(0, 488, 1024, 12)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#123d35'
  ctx.font = 'bold 75px Georgia'
  ctx.fillText('PROHERB', 512, 145)
  ctx.font = 'bold 24px Arial'
  ctx.fillText('T H E  N A T U R A L  L I F E', 512, 188)
  ctx.fillStyle = '#192e2a'
  ctx.font = '61px Georgia'
  ctx.fillText('BLACK CUMIN OIL', 512, 305)
  ctx.font = '38px Arial'
  ctx.fillText('SOFTGEL CAPSULES', 512, 366)
  ctx.fillStyle = '#648078'
  ctx.font = '25px Arial'
  ctx.fillText('PREMIUM WELLNESS COLLECTION', 512, 430)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 37px Arial'
  ctx.fillText('60 SOFTGELS  •  1000 mg', 512, 605)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  ownedTextures.push(texture)
  return texture
}

function makeSoftgel() {
  const geometry = new THREE.SphereGeometry(1, 24, 16)
  geometry.scale(0.235, 0.115, 0.12)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xe6a42d,
    metalness: 0.0,
    roughness: 0.16,
    transmission: 0.18,
    thickness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.08
  })
  return new THREE.Mesh(geometry, material)
}

function buildBottle() {
  bottleGroup = new THREE.Group()
  scene.add(bottleGroup)

  const amber = new THREE.MeshPhysicalMaterial({
    color: 0x673018,
    metalness: 0.02,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  })
  const shape = [
    [0, -1.5], [0.70, -1.5], [0.83, -1.45],
    [0.88, -1.35], [0.88, 0.75], [0.85, 0.95],
    [0.72, 1.13], [0.55, 1.27], [0.52, 1.43],
    [0.52, 1.58], [0, 1.58]
  ].map(([x, y]) => new THREE.Vector2(x, y))
  bottleGroup.add(new THREE.Mesh(new THREE.LatheGeometry(shape, 72), amber))

  // Full cylindrical label instead of a floating flat decal.
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.892, 0.892, 1.73, 96, 1, true),
    new THREE.MeshStandardMaterial({
      map: createLabelTexture(), roughness: 0.65,
      side: THREE.DoubleSide
    })
  )
  label.position.y = -0.2
  label.rotation.y = 0
  bottleGroup.add(label)

  // Glass neck and open mouth.
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.54, 0.52, 0.26, 64), amber
  )
  neck.position.y = 1.56
  bottleGroup.add(neck)

  const opening = new THREE.Mesh(
    new THREE.RingGeometry(0.36, 0.54, 64),
    new THREE.MeshStandardMaterial({
      color: 0x36180d, roughness: 0.3, side: THREE.DoubleSide
    })
  )
  opening.rotation.x = -Math.PI / 2
  opening.position.y = 1.697
  bottleGroup.add(opening)

  // The cap lives outside the bottle group so it can detach.
  capGroup = new THREE.Group()
  scene.add(capGroup)
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xf7f7f4, roughness: 0.5
  })
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.62, 0.35, 64),
    capMaterial
  )
  capGroup.add(cap)
  for (let i = 0; i < 40; i++) {
    const angle = i * Math.PI * 2 / 40
    const rib = new THREE.Mesh(
      new THREE.BoxGeometry(0.026, 0.27, 0.035),
      capMaterial
    )
    rib.position.set(Math.sin(angle) * 0.623, 0, Math.cos(angle) * 0.623)
    rib.rotation.y = angle
    capGroup.add(rib)
  }
}

function updateScene() {
  if (!bottleGroup || !capGroup) return
  const t = smooth(progress)

  // Positive Z rotation tilts the mouth to the left.
  bottleGroup.rotation.set(0.05, -0.22 + t * 0.18, 0.10 + t * 1.12)
  bottleGroup.position.set(0.65 - t * 0.05, 0.04 - t * 0.14, 0)
  bottleGroup.updateMatrixWorld(true)

  const mouth = bottleGroup.localToWorld(new THREE.Vector3(0, 1.79, 0.1))
  const capAttached = bottleGroup.localToWorld(new THREE.Vector3(0, 1.91, 0))
  const capRelease = smooth(clamp((t - 0.10) / 0.4))
  capGroup.position.copy(capAttached).lerp(new THREE.Vector3(-2.05, -1.42, 0.65), capRelease)
  capGroup.rotation.set(t * 0.15, 0, bottleGroup.rotation.z - capRelease * 1.75)

  capsules.forEach((capsule, i) => {
    const delay = i * 0.055
    const release = smooth(clamp((t - 0.19 - delay) / 0.45))
    const end = new THREE.Vector3(
      -2.05 + (i % 4) * 0.50,
      -1.55 + Math.floor(i / 4) * 0.12,
      0.8 + (i % 3) * 0.20
    )
    capsule.position.copy(mouth).lerp(end, release)
    capsule.rotation.set(0.1 + i * 0.23, i * 0.35, release * (1.2 + i * 0.65))
    capsule.scale.setScalar(release < 0.005 ? 0.001 : 1)
  })
}

function startRender() {
  if (frameId || !renderer || !isVisible || isDisposed || fallback.value) return
  const render = () => {
    frameId = 0
    if (!renderer || !isVisible || isDisposed || fallback.value) return
    try {
      renderer.render(scene, camera)
    } catch (error) {
      console.error('PROHERB WebGL render error:', error)
      fallback.value = true
      return
    }
    frameId = requestAnimationFrame(render)
  }
  frameId = requestAnimationFrame(render)
}

function stopRender() {
  if (frameId) cancelAnimationFrame(frameId)
  frameId = 0
}

function setup() {
  const el = mountEl.value
  if (!el) return
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 11.5)
  renderer = new THREE.WebGLRenderer({
    alpha: true, antialias: true, powerPreference: 'default'
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  el.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 2.2))
  const key = new THREE.DirectionalLight(0xffffff, 3.4)
  key.position.set(-4, 6, 7)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xb3ddd0, 2.1)
  rim.position.set(5, -2, -3)
  scene.add(rim)

  buildBottle()
  for (let i = 0; i < 9; i++) {
    const capsule = makeSoftgel()
    capsules.push(capsule)
    scene.add(capsule)
  }

  // Only resize when the actual dimensions have changed.
  const resize = () => {
    if (!el || !camera || !renderer || isDisposed) return
    const width = Math.max(1, Math.round(el.clientWidth))
    const height = Math.max(1, Math.round(el.clientHeight))
    if (width === lastWidth && height === lastHeight) return
    lastWidth = width
    lastHeight = height
    camera.aspect = width / height
    camera.position.z = width < 480 ? 13.5 : 11.5
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  onResize = resize
  resize()
  window.addEventListener('resize', onResize, { passive: true })
  // Observe parent, not the WebGL canvas being resized.
  if ('ResizeObserver' in window && el.parentElement) {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(el.parentElement)
  }

  onScroll = () => {
    if (isDisposed) return
    const rect = el.getBoundingClientRect()
    const viewport = Math.max(1, window.innerHeight)
    const next = clamp((-rect.top) / (viewport * 0.85))
    progress = reducedMotion() ? 0.68 : next
    updateScene()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if ('IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver(entries => {
      isVisible = entries[0]?.isIntersecting ?? true
      if (isVisible) startRender()
      else stopRender()
    }, { rootMargin: '120px' })
    intersectionObserver.observe(el)
  } else {
    startRender()
  }
}

onMounted(() => {
  try {
    setup()
  } catch (error) {
    console.error('PROHERB 3D initialization error:', error)
    fallback.value = true
    stopRender()
    renderer?.domElement?.remove()
  }
})

onUnmounted(() => {
  isDisposed = true
  stopRender()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  scene?.traverse(object => {
    object.geometry?.dispose()
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach(material => material.dispose())
    }
  })
  ownedTextures.forEach(texture => texture.dispose())
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>

<template>
  <div
    ref="mountEl"
    class="softgel-scene"
    role="img"
    aria-label="Interactive 3D PROHERB softgel bottle"
  >
    <img
      v-if="fallback"
      src="/products/p32.webp"
      class="scene-fallback"
      alt="PROHERB Black Cumin Seed Oil"
    />
    <span class="scene-tag">PROHERB 3D EXPERIENCE ↘</span>
  </div>
</template>

<style scoped>
.softgel-scene {
  position: relative;
  width: 100%;
  height: 560px;
  max-height: 75vh;
  min-height: 360px;
  overflow: hidden;
  contain: layout paint;
}
.softgel-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
.scene-fallback {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.scene-tag {
  position: absolute;
  right: 20px;
  bottom: 18px;
  font: 700 10px Arial, sans-serif;
  letter-spacing: .16em;
  color: #466f61;
  pointer-events: none;
}
@media (max-width: 700px) {
  .softgel-scene {
    height: 390px;
    min-height: 300px;
    max-height: none;
  }
}
</style>
