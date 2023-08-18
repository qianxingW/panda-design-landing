import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';

import ReactDOM from 'react-dom';

import clsx from 'clsx';

// 获取所有的父级元素
export function useGetElementParent(element) {
  const [parent, setParent] = useState([]);

  useEffect(() => {
    if (element) {
      let node = element;
      let list = [];
      while (node && node.parentElement) {
        node = node.parentElement;
        list.push(node);
      }
      list.push(document);
      setParent(list);
    }
  }, [element]);

  return parent;
}

function Popup(props, ref) {
  const {
    className,
    children,
    visible,
    refEl,
    position = 'content',
    onClose,
    trigger,
    targetHidden = false,
    offset = 0,
    interval = 12,
    scrollRef,
    arrowPointAtCenter = false,
    disPositionSize = false,
    ...prop
  } = props;

  const prefix = 'panda'
  const [style, setStyle] = useState({ transform: `translate(-100%, -100%)` });
  const parent = useGetElementParent(refEl.current);

  const innerRef = useRef(null);
  const sizeRef = useRef({
    left: 0,
    top: 0,
    innerPosition: position,
  });

  useImperativeHandle(ref, () => {
    return {
      handleStyle: () => {
        setStyle(handleStyle());
      },
    };
  });

  function getSizePosition() {
    if (!visible || !refEl.current || !innerRef.current) return null;
    let refTarget = innerRef.current.getBoundingClientRect();
    let refElTarget = refEl.current.getBoundingClientRect();
    let refWidth = refTarget.width;
    let refHeight = refTarget.height;
    let refElWidth = refElTarget.width;
    let refElHeight = refElTarget.height;
    let left = sizeRef.current.left;
    let top = sizeRef.current.top;

    return {
      refWidth,
      refHeight,
      top: {
        x: left + refElWidth / 2 - refWidth / 2,
        y: top - interval - refHeight,
      },
      'top-left': {
        x: arrowPointAtCenter ? left - offset + refElWidth / 2 - 16 : left - offset,
        y: top - interval - refHeight,
      },
      'top-right': {
        x: arrowPointAtCenter
          ? left + refElWidth / 2 - refWidth + 21 + offset
          : left + refElWidth - refWidth + offset,
        y: top - interval - refHeight,
      },
      left: {
        x: left - refWidth - interval,
        y: top + refElHeight / 2 - refHeight / 2,
      },
      right: {
        x: left + refElWidth + interval,
        y: top + refElHeight / 2 - refHeight / 2,
      },
      bottom: {
        x: left + refElWidth / 2 - refWidth / 2,
        y: top + refElHeight + interval,
      },
      'bottom-left': {
        x: arrowPointAtCenter ? left - offset + refElWidth / 2 - interval - 4 : left - offset,
        y: top + refElHeight + interval,
      },
      'bottom-right': {
        x: arrowPointAtCenter
          ? left + refElWidth / 2 - refWidth + 21 + offset
          : left + refElWidth - refWidth + offset,
        y: top + refElHeight + interval,
        width: refElWidth,
        height: refElHeight,
      },
      content: {
        x: left,
        y: top,
        width: refElWidth,
        height: refElHeight,
      },
    };
  }

  function handleRePosition() {
    let rePosition = position;

    let positionSize = getSizePosition();

    if (!positionSize) return;

    if (!disPositionSize) {
      if (position.indexOf('left') != -1) {
        if (positionSize[rePosition].x + positionSize.refWidth > window.innerWidth) {
          rePosition = rePosition.replace('left', 'right');
        }
      }

      if (rePosition.indexOf('right') != -1) {
        if (positionSize[rePosition].x <= 0) {
          rePosition = rePosition.replace('right', 'left');
        }
      }

      if (rePosition.indexOf('bottom') != -1) {
        if (positionSize[rePosition].y + positionSize.refHeight > window.innerHeight) {
          rePosition = rePosition.replace('bottom', 'top');
        }
      }

      if (rePosition.indexOf('top') != -1) {
        if (positionSize[rePosition].y <= 0) {
          rePosition = rePosition.replace('top', 'bottom');
        }
      }
    }
    sizeRef.current.innerPosition = rePosition;
  }

  function handleStyle() {
    let positionSize = getSizePosition();
    let innerPosition = sizeRef.current.innerPosition;
    if (!positionSize) return { transform: `translate(-100%, -100%)` };
    if (!positionSize[innerPosition]) return { transform: `translate(-100%, -100%)` };
    if (innerPosition === 'content') {
      return {
        transform: `translate(${positionSize[innerPosition].x}px, ${positionSize[innerPosition].y}px)`,
        width: positionSize[innerPosition].width,
        height: positionSize[innerPosition].height,
      };
    }
    return {
      transform: `translate(${positionSize[innerPosition].x}px, ${positionSize[innerPosition].y}px)`,
    };
  }

  useEffect(() => {
    function handleClick(e) {
      if (!visible) return;
      if (!refEl.current) return;
      if (!innerRef.current) return;

      // 判断选定区域
      if (targetHidden) {
        if (!ReactDOM.findDOMNode(refEl.current)?.contains(e.target)) {
          onClose && onClose();
        }
      } else {
        if (
          !ReactDOM.findDOMNode(refEl.current)?.contains(e.target) &&
          !ReactDOM.findDOMNode(innerRef.current)?.contains(e.target)
        ) {
          onClose && onClose();
        }
      }
    }
    if (trigger == 'click' && visible) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      if (trigger == 'click') {
        document.removeEventListener('click', handleClick);
      }
    };
  }, [visible]);

  function setPosition(ele) {
    let offset = refEl.current.getBoundingClientRect();
    sizeRef.current.left = offset.left;
    sizeRef.current.top = offset.top;
    handleRePosition();
    setStyle(handleStyle());
  }

  useEffect(() => {
    if (!visible) return;
    if (!refEl.current) return;
    function handleScroll(e) {
      setPosition(e.target);
    }
    function handleResize(e) {
      setPosition(e.target);
    }
    if (scrollRef) {
      scrollRef.addEventListener('scroll', handleScroll);
    }

    setPosition(parent);

    parent.forEach((item) => {
      item.addEventListener('scroll', handleScroll);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      parent.forEach((item) => {
        item.removeEventListener('scroll', handleScroll);
      });
      if (scrollRef) {
        scrollRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [parent, visible, refEl.current]);

  if (visible) {
    return ReactDOM.createPortal(
      <div
        style={style}
        className={clsx(
          `${prefix}-popup`,
          {
            [`${prefix}-popup-${sizeRef.current.innerPosition}`]: sizeRef.current.innerPosition,
          },
          className,
        )}
        ref={innerRef}
        {...prop}
      >
        {children}
      </div>,
      document.body,
    );
  }
  return null;
}

export default React.forwardRef(Popup);
