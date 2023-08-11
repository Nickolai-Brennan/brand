import React, {ReactHTML} from 'react'
import clsx from 'clsx'
import {Heading, Text, Link, HeadingProps, TextProps, LinkProps} from '../'

import styles from './Bento.module.css'

export type ColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type ResponsiveMap = {
  xs?: 2
  sm?: 4
  md?: 6
  lg?: 8
  xl?: 10
  xxl?: 12
}

type BentoProps = React.HTMLAttributes<HTMLDivElement>

const Root = ({className, ...rest}: BentoProps) => {
  return <section className={clsx(styles.Bento, className)} {...rest}></section>
}

type BentoItemProps = {
  columnStart?: ColumnIndex | ResponsiveMap
  columnSpan?: ColumnIndex | ResponsiveMap
  rowStart?: number | ResponsiveMap
  rowSpan?: number | ResponsiveMap
  flow?: 'row' | 'column'
  horizontalAlign?: 'start' | 'center' | 'end'
  verticalAlign?: 'start' | 'center' | 'end'
  colorMode?: 'light' | 'dark'
} & React.HTMLAttributes<HTMLDivElement>

const Item = ({
  className,
  columnStart,
  columnSpan,
  rowStart,
  rowSpan,
  flow,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  colorMode = 'light',
  ...rest
}: BentoItemProps) => {
  // Check for isBackground prop on Image child
  // Set the Image child to be full width behind Content
  // Both items should take up the size of the parent
  return (
    <div
      data-color-mode={colorMode}
      className={clsx(
        styles.Bento__Item,
        columnSpan && styles[`Bento__Item--column-span-${columnSpan}`],
        rowSpan && styles[`Bento__Item--row-span-${rowSpan}`],
        columnStart && styles[`Bento__Item--column-start-${columnStart}`],
        rowStart && styles[`Bento__Item--row-start-${rowStart}`],
        flow && styles[`Bento__Item-flow--${flow}`],
        styles[`Bento__Item-verticalAlign--${verticalAlign}`],
        styles[`Bento__Item-horizontalAlign--${horizontalAlign}`],
        className,
      )}
      {...rest}
    ></div>
  )
}

type BentoContentProps = {
  padding?: 'condensed' | 'normal' | 'spacious'
} & React.HTMLAttributes<HTMLDivElement>

const Content = ({children, padding, className, ...rest}: BentoContentProps) => {
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading,
  )
  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)
  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)
  return (
    <div className={clsx(!!padding && styles[`Bento-padding--${padding}`], className)} {...rest}>
      {React.isValidElement(HeadingChild) && (
        <div className={styles.Bento__heading}>
          {React.cloneElement(HeadingChild as React.ReactElement<HeadingProps>, {
            // as uses h3 default, but can be overridden
            as: HeadingChild.props.as || 'h3',
            size: HeadingChild.props.size || '3',
          })}
        </div>
      )}

      {React.isValidElement(TextChild) && (
        <div className={styles['Bento__body-text']}>
          {React.cloneElement(TextChild as React.ReactElement<TextProps>, {
            variant: 'muted',
            as: 'p',
            className: clsx(styles.Bento__text, TextChild.props.className),
          })}
        </div>
      )}
      {React.isValidElement(LinkChild) && (
        <div className={styles['Bento__call-to-action']}>
          {React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {size: 'large'})}
        </div>
      )}
    </div>
  )
}

type BentoVisualProps = {
  fillMedia?: boolean // defaults to true
  // isBackground?: boolean // defaults to false - NOT IMPLEMENTED
  position?: string // defaults to 50% 50%
  padding?: 'condensed' | 'normal' | 'spacious' //defaults to none
} & React.HTMLAttributes<HTMLDivElement>

const Visual = ({
  fillMedia = true,
  // isBackground = false, // TODO: Using grid set image full width behind content
  position = '50% 50%',
  padding,
  className,
  children,
  ...rest
}: BentoVisualProps) => {
  const childrenToRender = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === 'img') {
        return React.cloneElement(child as ReturnType<ReactHTML['img']>, {
          style: {objectPosition: position},
        })
      }
      return child
    }
  })
  return (
    <div
      className={clsx(
        styles.Bento__Visual,
        !fillMedia && styles['Bento__Visual-no-fill'],
        !!padding && styles[`Bento-padding--${padding}`],
        className,
      )}
      {...rest}
    >
      {childrenToRender}
    </div>
  )
}

export const Bento = Object.assign(Root, {Item, Visual, Content})
