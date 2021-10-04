import React, {
  FunctionComponent,
  MouseEvent,
  useState,
  useRef,
  useCallback,
  ReactNode,
  ReactElement,
} from "react";
import styled from "styled-components/macro";

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  & > [data-arrow="left"],
  & > [data-arrow="right"] {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
    top: 0;
    opacity: 1;
    height: 60px;
    width: 40px;
    position: absolute;
    cursor: pointer;
    bottom: 0;
    margin-bottom: auto;
    margin-top: auto;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
      height: 40px;
      border: none;
      outline: none;
      position: absolute;
      cursor: pointer;
      background: red;
    }
  }
  & > [data-arrow="left"] {
    left: -5px;
    & > button {
      transform: rotate(180deg) scale(0.5);
      left: -13px;
    }
  }
  & > [data-arrow="right"] {
    right: -5px;
    & > button {
      transform: scale(0.5);
      right: -16px;
    }
  }
  &.sliding > * {
    pointer-events: none;
  }
`;

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > * {
    flex: 0 0 auto;
  }
  & ::-webkit-scrollbar {
    display: none;
  }
`;

export enum SlideDirection {
  Right = -1,
  Left = 1,
}

export function getOuterWidth(el: HTMLElement) {
  const style = getComputedStyle(el);

  return (
    el.offsetWidth +
    (parseInt(style.marginLeft, 10) || 0) +
    (parseInt(style.marginRight, 10) || 0)
  );
}

export const Slider: FunctionComponent<SliderProps> = ({
  children,
  leftIcon,
  rightIcon,
}: SliderProps) => {
  const slider = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [position, setPosition] = useState({
    startX: 0,
    scrollLeft: 0,
  });

  const showArrows = (): Arrows => {
    const sliderElement = slider.current;
    return {
      left: !!sliderElement && sliderElement.scrollLeft > 0,
      right:
        !!sliderElement &&
        sliderElement.scrollWidth >
          sliderElement.scrollLeft + sliderElement.offsetWidth,
    };
  };
  const [showArrow, setShowArrow] = useState<Arrows>(showArrows());

  const handleOnScroll = () => {
    setShowArrow(showArrows());
  };

  const ref = useCallback(
    (node) => {
      if (node !== null) {
        Object.defineProperty(slider, "current", { value: node });
        setShowArrow(showArrows());
        // eslint-disable-next-line
        node.addEventListener("scroll", handleOnScroll);
      }
    },
    // eslint-disable-next-line
    [slider, children]
  );

  const mouseDown = (e: MouseEvent) => {
    setIsDown(true);
    // eslint-disable-next-line
    setPosition({
      startX: e.pageX - slider.current!.offsetLeft,
      scrollLeft: slider.current!.scrollLeft,
    });
  };

  const mouseUp = () => {
    setIsDown(false);
    setShowArrow(showArrows());
    // eslint-disable-next-line
    slider.current!.classList.remove("sliding");
  };

  const mouseMove = (e: MouseEvent) => {
    if (!isDown) return;
    // eslint-disable-next-line
    e.preventDefault();
    // eslint-disable-next-line
    slider.current!.classList.add("sliding");
    const eventPosition = e.pageX - slider.current!.offsetLeft;
    const slide = eventPosition - position.startX;

    slider.current!.scrollLeft = position.scrollLeft - slide;
  };

  const calculateSlideAmount = (direction: SlideDirection): number => {
    const _slider = slider.current!;
    const currentView =
      direction === SlideDirection.Left
        ? _slider.scrollLeft + _slider.offsetWidth
        : _slider.scrollLeft;

    const childNodes = Array.from(_slider.children) as HTMLElement[];
    let nodeWidthSum = 0;
    for (const node of childNodes) {
      const nodeWidth = getOuterWidth(node);
      nodeWidthSum += nodeWidth;

      if (nodeWidthSum >= currentView) {
        const showingPart =
          direction === SlideDirection.Left
            ? nodeWidthSum - currentView
            : nodeWidth;

        return (_slider.offsetWidth - showingPart) * direction;
      }
    }

    return _slider.offsetWidth;
  };

  const slide = (direction: SlideDirection) => {
    const slideAmount = calculateSlideAmount(direction);
    const start = slider.current!.scrollLeft;
    smoothHorizontalScroll(500, slideAmount, start);
  };

  const smoothHorizontalScroll = (
    time: number,
    amount: number,
    start: number
  ) => {
    let curTime = 0;
    for (let scrollCounter = 0; curTime <= time; scrollCounter++) {
      window.setTimeout(
        smoothHorizontalScrollBehavior,
        curTime,
        (scrollCounter * amount) / 100 + start
      );
      curTime += time / 100;
    }
  };

  const smoothHorizontalScrollBehavior = (amount: number) => {
    slider.current!.scrollLeft = amount;
  };

  const getArrow = (
    direction: SlideDirection,
    data: string,
    element?: ReactNode
  ) => {
    return (
      <div data-arrow={data} onClick={() => slide(direction)}>
        {element ?? <button />}
      </div>
    );
  };

  return (
    <SliderWrapper data-testid="carousel">
      {showArrow.left && getArrow(SlideDirection.Right, "left", leftIcon)}
      {showArrow.right && getArrow(SlideDirection.Left, "right", rightIcon)}
      <Container
        ref={ref}
        onMouseDown={mouseDown}
        onMouseLeave={mouseUp}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {children}
      </Container>
    </SliderWrapper>
  );
};

export interface SliderProps {
  children: ReactElement[];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type Arrows = {
  left: boolean;
  right: boolean;
};
