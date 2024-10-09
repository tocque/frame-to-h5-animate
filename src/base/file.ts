export const showFilePicker = async (accept?: string): Promise<FileList | null> => {
  const input = document.createElement("input");
  input.type = "file";
  if (accept) {
    input.accept = accept;
  }
  /** @todo 想办法检测到关闭事件 */
  await new Promise<void>((resolve) => {
    input.addEventListener("change", () => resolve(), { once: true });
    input.click();
  });
  return input.files;
}

export const downloadFile = (file: Blob, name?: string) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  if (name) {
    a.download = name;
  }
  a.click();
  URL.revokeObjectURL(a.href)
}
