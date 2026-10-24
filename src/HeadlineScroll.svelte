<script>
  import IntroBackgroundLeft from './assets/intro_desktop_01.png'
  import IntroBackgroundRight from './assets/intro_desktop_02.jpg'
  import IntroBackgroundLeftTwo from './assets/intro_desktop_03.jpg'
  import IntroBackgroundRightTwo from './assets/intro_desktop_04.jpg'
  import { range } from './lib/Range'

  // pixels scrolled from top
  let scrollY = $state(0)
  // height of window
  let innerHeight = $state(0)
  // height of section
  let sectionHeight = $state(0)

  // scroll progress
  let progress = $derived(innerHeight ? Math.max(0, scrollY / innerHeight) : 0)

  // opacity animation on initial sticky text
  let firstOpacity = $derived(1 - range(progress, 0, 0.4))
  let lastOpacity = $derived(1 - range(progress, 0.5, 0.9))

  // opacity animation on images
  let rightTwoOpacity = $derived(range(progress, 0.9, 1.3))
  let leftTwoOpacity = $derived(range(progress, 2.3, 2.7))

  // fade out entire section at end of scrolly
  let endProgress = $derived(innerHeight ? (sectionHeight - innerHeight) / innerHeight : 0)
  let topperOpacity = $derived(
    sectionHeight ? 1 - range(progress, endProgress - 0.5, endProgress) : 1,
  )
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section bind:clientHeight={sectionHeight} style:opacity={topperOpacity}>
  <div class="background-wrapper">
    <!-- left side images -->
    <div class="topper-left-wrapper">
      <div class="topper-media">
        <div class="topper-stage">
          <img
            src={IntroBackgroundLeft}
            alt="A bouquet wrapped in paper during sunset."
            class="topper-image-left"
          />
          <img
            src={IntroBackgroundLeftTwo}
            alt="A girl in a white dress layered over a red jumpsuit in a grassy field."
            class="topper-image-left topper-image-next"
            style:opacity={leftTwoOpacity}
          />
        </div>
      </div>

      <!-- what appears over the images -->
      <div class="topper-content">
        <div class="topper-text-sticky-outer">
          <div class="topper-text-sticky">
            <p class="topper-image-text">
              <span class="topper-text-outer" style:opacity={firstOpacity}>
                <span>The trembling air, time</span>
                <span>sliding over our bodies like</span>
                <span>water. All the emptiness</span>
                <span>around us, as well as</span>
              </span>
              <span style:display="inline" style:opacity={lastOpacity}>everything that remains</span
              ><span style:display="inline" style:opacity={firstOpacity}>.</span>
            </p>
          </div>
        </div>

        <div class="topper-headline-wrapper">
          <div class="kicker"><p>Opinion</p></div>
          <h1 class="topper-hed">
            <span>To</span>
            <span>Fall</span>
            <span>In Love</span>
            <span>With</span>
            <span>The</span>
            <span>World</span>
          </h1>
          <p class="topper-dek">
            <span>A late summer meditation</span><span>on time, loss, and solace in</span><span
              >the natural world, made from</span
            ><span>the work of the photographer </span><span>Mary Manning and the </span><span
              >poet Brian Turner.</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- right side images -->
    <div class="topper-right-wrapper">
      <div class="topper-media">
        <div class="topper-stage">
          <img
            src={IntroBackgroundRight}
            alt="Out-of-focus pink and red flowers amongst green leaves."
            class="topper-image-right"
          />
          <img
            src={IntroBackgroundRightTwo}
            alt="An empty room in blue light."
            class="topper-image-right topper-image-next"
            style:opacity={rightTwoOpacity}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import './headlinescrolly.css';
</style>
