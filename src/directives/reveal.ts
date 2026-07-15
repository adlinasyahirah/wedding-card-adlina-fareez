import type { ObjectDirective } from 'vue'

const revealObserver =
  typeof window !== 'undefined' && 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.classList.add('reveal-section--visible')
            observer.unobserve(entry.target)
          })
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.08,
        },
      )
    : undefined

export const reveal: ObjectDirective<HTMLElement> = {
  mounted(element) {
    element.classList.add('reveal-section')

    if (!revealObserver) {
      element.classList.add('reveal-section--visible')
      return
    }

    revealObserver.observe(element)
  },
  unmounted(element) {
    revealObserver?.unobserve(element)
  },
}
