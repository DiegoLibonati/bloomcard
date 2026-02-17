interface DefaultProps {
  className?: string;
  children?: string;
}

export interface CardProps extends DefaultProps {
  imgSrc: string;
  title: string;
  isActive: boolean;
  onClick: (e: MouseEvent) => void;
}
