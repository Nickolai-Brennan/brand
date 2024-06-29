import React from 'react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Meta, StoryFn} from '@storybook/react'

import {SolutionTemplate} from './SolutionTemplate'
import {sharedArgTypes} from '../helpers'

export default {
  title: 'Recipes/Solutions/Org size',
  component: SolutionTemplate,
  args: {
    variant: 'size',
    heroLabel: 'Teams',
    heroTitle: 'Build like the best teams on the planet',
    heroDescription:
      'With CI/CD, Dependabot, and the world’s largest developer community, GitHub gives your team everything they need to ship better software faster.',
    heroCtaTextPrimary: 'Get started with Teams',
    heroCtaTextSecondary: 'Create a free organization',
    heroImage: true,

    sectionIntroText: 'A single, integrated, enterprise-ready platform',
    sectionIntroCTAText: 'Explore GitHub Enterprise',

    introVariant: 'editorial list',
    logobarVisible: false,
    riverVisible: false,
    customerStoryVisible: false,
    testimonialsVisible: false,
    faqVisible: false,

    jtbd1Visible: true,
    jtbd2Visible: false,
    jtbd3Visible: false,
    jtbdBentosVisible: false,
  },
  argTypes: {
    ...sharedArgTypes,
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
} as Meta<typeof SolutionTemplate>

export const Playground: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Playground.args = {
  variant: 'size',
  logoBarVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
  jtbd1Visible: true,
  jtbd2Visible: false,
  jtbd3Visible: false,
  jtbdBentosVisible: false,
}

export const Minimum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Minimum.args = {
  variant: 'size',
  jtbd1Visible: true,
  jtbd2Visible: false,
  jtbd3Visible: false,
  jtbdBentosVisible: false,
}

export const Maximum: StoryFn<typeof SolutionTemplate> = args => <SolutionTemplate {...args} />
Maximum.args = {
  variant: 'size',
  logoBarVisible: true,
  testimonialsVisible: true,
  faqVisible: true,
  jtbd2Visible: true,
  jtbd3Visible: true,
  jtbdBentosVisible: true,
}
