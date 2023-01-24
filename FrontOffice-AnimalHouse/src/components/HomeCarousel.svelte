<script>
    import { images } from "../image"
    import { CarouselTransition } from 'flowbite-svelte'
</script>

<div class="max-w-4xl">
    <CarouselTransition {images} transitionType="fade" transitionParams="{{ duration: 1000 }}" showCaptions={false} showThumbs={false} duration={5000} />
</div>
