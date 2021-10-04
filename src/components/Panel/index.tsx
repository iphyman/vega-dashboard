import { ReactNode, forwardRef } from "react";
import styled from "styled-components/macro";
import { RiCloseFill } from "react-icons/ri";
import { IoResizeSharp } from "react-icons/io5";

export interface PanelProps {
  height?: string;
  title?: string;
  header?: ReactNode;
  children?: ReactNode;
  style?: any;
  className?: any;
}

const Container = styled.div<Pick<PanelProps, "height">>`
  width: 100%;
  height: ${({ height }) => height ?? "100%"};
  background-color: #1f1f1f;
  overflow: hidden;
`;

const HeaderWrap = styled.div`
  width: 100%;
  height: 30px;
  background-color: #4e524e;
  display: flex;
  align-items: center;
  cursor: move;
`;

const Title = styled.div`
  color: #f5f5f5a3;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  flex-grow: 1;
  white-space: nowrap;
  padding: 2px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderControls = styled.div`
  display: flex;
`;

const IconBtn = styled.button`
  font-size: 16px;
  color: #ffffff;
  appearance: none;
  padding: 2px;
  margin: 0px;
  margin-right: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.5s color ease;

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    color: #f5f5f5a3;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  flex: 1 1 auto;
`;

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (props: PanelProps, ref) => {
    const { height, header, title, children, style, className } = props;

    return (
      <Container
        height={height}
        ref={ref}
        style={{ ...style }}
        className={className}
        {...props}
      >
        <HeaderWrap>
          <Title className="MyDragHandler">{header ?? title}</Title>
          <HeaderControls>
            <IconBtn>
              <IoResizeSharp />
            </IconBtn>
            <IconBtn>
              <RiCloseFill />
            </IconBtn>
          </HeaderControls>
        </HeaderWrap>
        <ContentWrapper>{children}</ContentWrapper>
        <span className="react-resizable-handle react-resizable-handle-se"></span>
      </Container>
    );
  }
);

Panel.displayName = "Panel";
export default Panel;
