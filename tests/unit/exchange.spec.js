import { expect } from 'chai'
import { shallowMount,createLocalVue,enableAutoDestroy } from '@vue/test-utils'
import Vuex from 'vuex'
import i18n from '@/i18n'
import Exchange from '@/components/Exchange.vue'

enableAutoDestroy(afterEach)

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Exchange.vue', () => {

  let getters
  let store
  const balances = [{asset:"ETH",total:1,usd:2800,tryl:39000},{asset:"BTC",total:1,usd:2800,tryl:39000}]
  const available = 2
  const grandTotal = {usd:4,try:4}
  
  beforeEach(() => {
    getters = {
      getIsLoading: () => true,
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('Exchange: props.balances when passed', () => {
    const wrapper = shallowMount(Exchange, {
      i18n,
      store, 
      localVue, 
      propsData: { balances,available,grandTotal }
    })
    expect(wrapper.props('balances').length).to.equals(2)
    expect(wrapper.props('balances')[0].asset).to.equals("ETH")
    expect(wrapper.props('balances')[0].total).to.equals(1)
    expect(wrapper.props('balances')[0].usd).to.equals(2800)
    expect(wrapper.props('balances')[0].tryl).to.equals(39000)
  })

  it('Exchange: props.available when passed', () => {
    const wrapper = shallowMount(Exchange, {
      i18n,
      store, 
      localVue, 
      propsData: { balances,available,grandTotal }
    })
    expect(wrapper.props('available')).to.equals(2)
  })

  it('Exchange: props.grandTotal when passed', () => {
    const wrapper = shallowMount(Exchange, {
      i18n,
      store, 
      localVue, 
      propsData: { balances,available,grandTotal }
    })
    expect(Object.keys(wrapper.props('grandTotal')).length).to.equals(2)
    expect(wrapper.props('grandTotal').usd).to.equals(4)
    expect(wrapper.props('grandTotal').try).to.equals(4)
  })

  it('renders props.balances.asset when passed', () => {
    const wrapper = shallowMount(Exchange, {
      i18n,
      store, 
      localVue, 
      propsData: { balances,available,grandTotal }
    })
    const asset = wrapper.find('transition-group-stub > tr > .cryptoasset > .asset')
    expect(asset.text()).to.equals("ETH")
  })
})
