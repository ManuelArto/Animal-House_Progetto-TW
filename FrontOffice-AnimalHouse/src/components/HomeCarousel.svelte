<script>
    import images from "../data/images.json"
    import { CarouselTransition } from 'flowbite-svelte'
</script>

<div class="w-full">
    <CarouselTransition {images} transitionType="fade" transitionParams="{{ duration: 1000 }}" showCaptions={false} showThumbs={false} duration={5000} />
</div>
