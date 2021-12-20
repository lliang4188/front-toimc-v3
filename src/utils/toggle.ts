import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toggleUtils = (initState: boolean, delay:number) => {
  const on = ref(initState ?? false)

  const toggle = (value:boolean) => {
    setTimeout(() => {
      on.value = value ?? !on.value
    }, delay)
  }
  return {
    on,
    toggle
  }
}

export default toggleUtils
