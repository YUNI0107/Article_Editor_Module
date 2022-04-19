import { useState, useRef, useMemo, FocusEvent } from 'react'
import classNames from 'classnames'

// components
import EachContainer from '../EachContainer'

// utils
import getElementPosition from '../../../utils/getElementPosition'

// types
import { IImages } from '../../../types/editor'

/**
 *
 * There are 2 conditions
 *
 * Element focused
 * 1. Editor button will not disappear & isButtonShow should be true
 * 2. Editor button will not hidden when mouseLeave the element
 * 3. Editor button click popup toggle
 * 4. isFocused should be true
 *
 * Element unfocused
 * 1. Editor button show when mouseEnter the element
 * 2. Editor button will hidden when mouseLeave the element
 * 3. isFocused & isPopupShow should be false
 *
 */

function FocusElement({ scheme }: { scheme: IImages }) {
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isButtonShow, setIsButtonShow] = useState(false)
  const mainContent = useRef<HTMLDivElement | null>(null)
  const container = useRef<HTMLDivElement | null>(null)

  // memos

  const distance = useMemo(() => {
    console.log('rerender')
    const { x: elementX, y: elementY } = getElementPosition(mainContent.current || null)
    return {
      top: elementX + 100,
      left: elementY + 100,
    }
  }, [])

  // operation
  const PopupShowHandler = () => {
    if (!isPopupShow && isFocused) {
      setIsPopupShow(true)
    } else {
      setIsPopupShow(false)
    }
  }

  const elementBlur = (event: FocusEvent<HTMLDivElement, Element>) => {
    // FocusEvent.relatedTarget : https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
    // Reference : https://stackoverflow.com/questions/12092261/prevent-firing-the-blur-event-if-any-one-of-its-children-receives-focus
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // Did the focus element contains in whole container
      // target : The EventTarget losing focus
      // relatedTarget : The EventTarget receiving focus
      setIsPopupShow(false)
      setIsFocused(false)
      setIsButtonShow(false)
    }
  }

  const elementMouseLeave = () => {
    if (!isFocused) setIsButtonShow(false)
  }

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={elementBlur}
      onMouseEnter={() => setIsButtonShow(true)}
      onMouseLeave={elementMouseLeave}
      ref={container}
      tabIndex={-1}
      className="relative"
    >
      {/* element */}
      <div ref={mainContent} className={classNames({ 'ring-4': isFocused })}>
        <EachContainer
          scheme={scheme}
          PopupShowHandler={PopupShowHandler}
          isButtonShow={isButtonShow}
          isPopupShow={isPopupShow}
          setIsPopupShow={setIsPopupShow}
          distance={distance}
        />
      </div>
    </div>
  )
}

export default FocusElement
