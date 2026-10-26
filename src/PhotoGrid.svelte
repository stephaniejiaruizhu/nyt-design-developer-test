<script>
  import { MediaQuery } from 'svelte/reactivity'
  import silverware from './assets/MM_Figure1_1.jpg?format=webp'
  import outfit from './assets/MM_Figure1_2.jpg?format=webp'
  import couch from './assets/MM_Figure1_3.jpg?format=webp'
  import chair from './assets/MM_Figure1_4.jpg?format=webp'
  import camera from './assets/MM_Figure4_1.jpg?format=webp'
  import { range } from './lib/Range'

  // breakpoint to change photo grid format
  const isMobile = new MediaQuery('max-width: 1025px')

  // pixels scrolled from top
  let scrollY = $state(0)
  // height of window
  let innerHeight = $state(0)
  // spacer
  let scrollEl = $state()

  // controls speed of animations - larger the number, the slower it is
  const pace = 2

  // measures where spacer is
  let p = $derived.by(() => {
    scrollY
    if (!scrollEl || !innerHeight) return 0
    return (1 - scrollEl.getBoundingClientRect().top / innerHeight) / pace
  })

  // timeline for image transitions
  const steps = {
    desktop: {
      chair: [0.3, 0.7],
      outfit: [0.3, 0.7],
      couch: [0.9, 1.2],
      silverware: [0.9, 1.2],
      camera: [1.7, 2.0],
    },
    mobile: {
      couch: [0.3, 0.7],
      silverware: [0.9, 1.2],
      camera: [1.7, 2.0],
    },
  }

  // control opacity change based on screen size
  let active = $derived(isMobile.current ? steps.mobile : steps.desktop)
  const opacity = (name) => (active[name] ? range(p, ...active[name]) : 1)
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section>
  <div class="photogrid-wrapper-outer">
    <img
      src={chair}
      alt="wooden chair with one leg on a red and white carpet"
      class="grid-image grid-image-small"
      style:opacity={opacity('chair')}
    />
    <div class="photogrid-wrapper-middle">
      <img
        src={camera}
        alt="person holding a camera vertically"
        class="grid-image grid-image-top"
        style:opacity={opacity('camera')}
      />
      <div class="photogrid-wrapper-middle-inner">
        <img
          src={silverware}
          alt="two sets of forks, knives, napkin and placemat on a table"
          class="grid-image grid-image-small"
          style:opacity={opacity('silverware')}
        />
        <img
          src={outfit}
          alt="person wearing a white top, jeans and a colorful jacket around their waist"
          class="grid-image grid-image-small desktop-only"
          style:opacity={opacity('outfit')}
        />
        <img
          src={couch}
          alt="gray-blue one-seater couch with yellow cushion"
          class="grid-image grid-image-small mobile-only"
          style:opacity={opacity('couch')}
        />
      </div>
    </div>
    <img
      src={couch}
      alt="gray-blue one-seater couch with yellow cushion"
      class="grid-image grid-image-small desktop-only"
      style:opacity={opacity('couch')}
    />
  </div>
  <div class="photogrid-scroll" bind:this={scrollEl}></div>
</section>

<style>
  @import './photogrid.css';
</style>
