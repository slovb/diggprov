import { describe, expect, it } from 'vitest'

import { User } from '@/models/user'
import { mount } from '@vue/test-utils'
import UserListRow from '../UserListRow.vue'

describe('UserListRow', () => {
  it('renders name properly', () => {
    const user = new User('Testpilot', 'address', 'email', 'telephone')
    const wrapper = mount(UserListRow, { props: { user: user } })
    expect(wrapper.text()).toContain('Testpilot')
  })
})
