<script>
  import { MediaQuery } from 'svelte/reactivity'
  import silverware from './assets/MM_Figure1_1.jpg'
  import outfit from './assets/MM_Figure1_2.jpg'
  import couch from './assets/MM_Figure1_3.jpg'
  import chair from './assets/MM_Figure1_4.jpg'
  import camera from './assets/MM_Figure4_1.jpg'
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
      chair: [0.3, 0.6],
      outfit: [0.3, 0.6],
      couch: [0.8, 1.1],
      silverware: [1.0, 1.3],
      camera: [1.8, 2.1],
    },
    mobile: {
      couch: [0.3, 0.6],
      silverware: [0.8, 1.1],
      camera: [1.8, 2.1],
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
      alt="..."
      class="grid-image grid-image-small"
      style:opacity={opacity('chair')}
    />
    <div class="photogrid-wrapper-middle">
      <img
        src={camera}
        alt="..."
        class="grid-image grid-image-top"
        style:opacity={opacity('camera')}
      />
      <div class="photogrid-wrapper-middle-inner">
        <img
          src={silverware}
          alt="..."
          class="grid-image grid-image-small"
          style:opacity={opacity('silverware')}
        />
        <img
          src={outfit}
          alt="..."
          class="grid-image grid-image-small desktop-only"
          style:opacity={opacity('outfit')}
        />
        <img
          src={couch}
          alt="..."
          class="grid-image grid-image-small mobile-only"
          style:opacity={opacity('couch')}
        />
      </div>
    </div>
    <img
      src={couch}
      alt="..."
      class="grid-image grid-image-small desktop-only"
      style:opacity={opacity('couch')}
    />
  </div>
  <div class="photogrid-scroll" bind:this={scrollEl}></div>
</section>

<style>
  @import './photogrid.css';
</style>
