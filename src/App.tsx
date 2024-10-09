import { useMemo, useState } from 'react';
import { Button, InputNumber, Spin } from '@douyinfe/semi-ui';
import { downloadFile, showFilePicker } from './base/file';
import { usePromiseValue } from './base/hooks/async';
import { createImageFromBlob, splitImage } from './base/image';
import AnimatePreview from './AnimatePreview';
import { dumpAnimate, frameToAnimate } from './transform';
import PlayController from './PlayController';
import { IconDownload } from '@douyinfe/semi-icons';

function App() {
  
  const [frameFile, setFrameFile] = useState<File>();
  const [frameWidth, setFrameWidth] = useState(32);
  const [currentFrame, setCurrentFrame] = useState(0);

  const openFile = async () => {
    const files = await showFilePicker("image/png");
    if (!files) return;
    const [file] = files;
    if (!file) return;
    setFrameFile(file);
  };

  const [animate, loading] = usePromiseValue(useMemo(async () => {
    if (!frameFile) return;
    const image = await createImageFromBlob(frameFile);
    const frames = splitImage(image, frameWidth);
    return frameToAnimate(frames);
  }, [frameFile, frameWidth]));

  const downloadAnimate = async () => {
    if (!animate) return;
    const data = await dumpAnimate(animate);
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
    const name = (frameFile?.name.split(".").slice(0, -1).join("") ?? "new_animate");
    downloadFile(blob, name + ".animate");
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <Button onClick={openFile}>打开帧动画图片</Button>
        <InputNumber prefix="帧宽度" value={frameWidth} onChange={(e) => setFrameWidth(Number(e))} />
        {animate && <Button icon={<IconDownload />} onClick={downloadAnimate}>下载</Button>}
      </div>
      <div>
        {loading ? <Spin /> : (animate && (
          <div>
            <AnimatePreview animate={animate} frame={currentFrame} />
            <PlayController value={currentFrame} total={animate.frame_max} onChange={setCurrentFrame} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
