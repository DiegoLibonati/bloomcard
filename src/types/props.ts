interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface CardProps extends DefaultProps {
  imgSrc: string;
  title: string;
  isActive: boolean;
  onClick: (e: MouseEvent) => void;
}
