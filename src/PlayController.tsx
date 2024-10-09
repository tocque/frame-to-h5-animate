import { FC, useLayoutEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "@douyinfe/semi-ui";
import { IconChevronLeft, IconChevronRight, IconPause, IconPlay, IconStop } from "@douyinfe/semi-icons";
import { useCurrentFn } from "./base/hooks/utils";

const FRAME_SPEED = 1000 / 24;

interface IPlayControllerProps {
  value: number;
  total: number;
  onChange: (val: number) => void;
}

const PlayController: FC<IPlayControllerProps> = (props) => {
  const { value, total, onChange } = props;

  const lastTimeRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  const onFrame = useCurrentFn((time: number) => {
    if (time - lastTimeRef.current < FRAME_SPEED) return;
    if (value === total - 1) {
      setPlaying(false);
      onChange(0);
    } else {
      onChange(value + 1);
      lastTimeRef.current = time;
    }
  });

  useLayoutEffect(() => {
    if (!playing) return;
    let stop = false;
    const loop = (time: number) => {
      if (stop) return;
      onFrame(time);
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
    return () => {
      stop = true;
    };
  }, [playing]);

  return (
    <ButtonGroup>
      <Button icon={<IconChevronLeft />} disabled={value === 0} onClick={() => onChange(value - 1)} />
      <Button disabled style={{ minWidth: 60 }}>{value + 1}/{total}</Button>
      <Button icon={<IconChevronRight />} disabled={value === total-1} onClick={() => onChange(value + 1)} />
      <Button icon={<IconPlay />} disabled={playing} onClick={() => setPlaying(true)} />
      <Button icon={<IconPause />} disabled={!playing} onClick={() => setPlaying(false)} />
      <Button icon={<IconStop />} disabled={!playing && value === 0} onClick={() => {
        setPlaying(false);
        onChange(0);
      }} />
    </ButtonGroup>
  )
}

export default PlayController;
