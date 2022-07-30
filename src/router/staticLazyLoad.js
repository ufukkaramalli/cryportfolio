export const Navigation = resolve => {
    require.ensure(['@/components/Navigation.vue'], () => {
      resolve(require('@/components/Navigation.vue'))
    })
  }
export const Footer = resolve => {
    require.ensure(['@/components/Footer.vue'], () => {
      resolve(require('@/components/Footer.vue'))
    })
  }