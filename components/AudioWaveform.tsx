import { useEffect } from "react";

const filterData = (audioBuffer: any) => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 70; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // Number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    filteredData.push(rawData[i * blockSize]);
  }
  return filteredData;
};

const AudioWaveForm = (props: { url: string }) => {
  const tryLearn = async () => {
    const resp = await fetch(props.url);

    if (resp.ok) {
      const arrayBuffer = await resp.arrayBuffer();
      console.log(arrayBuffer);
      const audioCtx = new window.AudioContext();

      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const filtered = filterData(audioBuffer);
      console.log(filtered);
    } else {
      console.log("gagal");
    }
  };

  useEffect(() => {
    if (!!props.url) {
      tryLearn();
    }
  }, [props.url]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

export default AudioWaveForm;
