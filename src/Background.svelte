<script>
  import IntroBackgroundLeft from './assets/intro_desktop_01.png'
  import IntroBackgroundRight from './assets/intro_desktop_02.jpg'
  import IntroBackgroundLeftTwo from './assets/intro_desktop_03.jpg'
  import IntroBackgroundRightTwo from './assets/intro_desktop_04.jpg'

  let scrollY = $state(0)
  let innerHeight = $state(0)
  let sectionHeight = $state(0)

  let progress = $derived(innerHeight ? Math.max(0, scrollY / innerHeight) : 0)

  // maps progress from [start, end] to [0, 1]
  const range = (value, start, end) => Math.min(1, Math.max(0, (value - start) / (end - start)))

  // fade out first few lines and period
  let linesOpacity = $derived(1 - range(progress, 0, 0.4))

  // fade out last line
  let lastOpacity = $derived(1 - range(progress, 0.5, 0.9))

  // fade out images
  // right image
  let rightTwoOpacity = $derived(range(progress, 0.9, 1.3))
  // left image
  let leftTwoOpacity = $derived(range(progress, 2.4, 2.8))

  const hedWords = ['To', 'Fall', 'in Love', 'with', 'the', 'World']
  let hedSpans = $state([])
  let grayWords = $state(hedWords.map(() => false))

  $effect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number(entry.target.dataset.i)
          // turns text gray once it hits top 15% of viewport
          grayWords[i] = entry.boundingClientRect.top <= entry.rootBounds.bottom
        }
      },
      { rootMargin: '0px 0px -85% 0px' },
    )
    hedSpans.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  })

  let endProgress = $derived(innerHeight ? (sectionHeight - innerHeight) / innerHeight : 0)
  let topperOpacity = $derived(
    sectionHeight ? 1 - range(progress, endProgress - 0.5, endProgress) : 1,
  )
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section bind:clientHeight={sectionHeight} style:opacity={topperOpacity}>
  <div class="background-wrapper">
    <div class="topper-left-wrapper">
      <div class="topper-media">
        <div class="topper-stage">
          <img
            src={IntroBackgroundLeft}
            alt="A bouquet wrapped in paper in orange to magenta light."
            class="topper-image-left"
          />
          <img
            src={IntroBackgroundLeftTwo}
            alt="A girl in a white dress spins in a grassy field in front of trees."
            class="topper-image-left topper-image-next"
            style:opacity={leftTwoOpacity}
          />
        </div>
      </div>

      <!-- content layer: scrolls over the image -->
      <div class="topper-content">
        <div class="topper-text-sticky-outer">
          <div class="topper-text-sticky">
            <p class="topper-image-text">
              <span class="topper-text-outer" style:opacity={linesOpacity}>
                <span>The trembling air, time</span>
                <span>sliding over our bodies like</span>
                <span>water. All the emptiness</span>
                <span>around us, as well as</span>
              </span>
              <span style:display="inline" style:opacity={lastOpacity}>everything that remains</span
              ><span style:display="inline" style:opacity={linesOpacity}>.</span>
            </p>
          </div>
        </div>

        <div class="topper-headline-wrapper">
          <div class="kicker"><p>Opinion</p></div>
          <h1 class="topper-hed">
            {#each hedWords as word, i}
              <span data-i={i} bind:this={hedSpans[i]} class:is-gray={grayWords[i]}>{word}</span
              >{' '}
            {/each}
          </h1>
          <p class="topper-dek">
            A late summer meditation <br /> on time, loss, and solace in <br />the natural world,
            made from <br />the work of the photographer <br />Mary Manning and the <br />poet Brian
            Turner.
          </p>
        </div>
      </div>
    </div>

    <div class="topper-right-wrapper">
      <div class="topper-media">
        <div class="topper-stage">
          <img
            src={IntroBackgroundRight}
            alt="Out-of-focus pink and red flowers among green leaves."
            class="topper-image-right"
          />
          <img
            src={IntroBackgroundRightTwo}
            alt="Blue light falls across an empty room with a tall window."
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
