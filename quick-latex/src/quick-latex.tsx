import {
Action,
ActionPanel,
environment,
List,
popToRoot,
showHUD
} from "@raycast/api";
import { useState, useEffect } from "react";
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { runAppleScript } from "run-applescript";
import { image } from "image-downloader";

const downloadDir = resolve(environment.supportPath, "download");
const latexUrl = "https://latex.codecogs.com/png.image?" + encodeURIComponent("\\dpi{300}")
const latexUrlDark = "https://latex.codecogs.com/png.image?" + encodeURIComponent("\\dpi{300}\\bg{white}")
export default function CommandWithCustoEmptyView() {
  const [state, setState] = useState({ searchText: "", items: [] });
  useEffect(() => {
    // perform an API call that eventually populates `items`.
    if (!existsSync(downloadDir)) {
        mkdirSync(downloadDir, { recursive: true });
      }
  }, [state.searchText]);

  return (
    <List
      onSearchTextChange={(newValue) =>
        setState((previous) => ({ ...previous, searchText: newValue }))
      }>
      { state.searchText != "" ? (
        <List.EmptyView
          icon={{ source: {light:  latexUrl + encodeURIComponent(state.searchText), dark: latexUrlDark + encodeURIComponent(state.searchText) } }}
          actions={
            <ActionPanel>
                <Action title="Copy LaTeX image" onAction={() => { copylatex(latexUrl + encodeURIComponent(state.searchText)) }} />
            </ActionPanel>}
        />
        
      ) : (
        state.items.map((item) => <List.Item key={item} title={item} />)
        
      )}
    </List>
  );

  function copylatex(url:string) {
      image({url: url, dest: downloadDir + "/img.jpg"}).then(res => {
            runAppleScript(`set the clipboard to POSIX file "${downloadDir}/img.jpg"`), showHUD("Copied.")
        })
        .catch(() => {
            console.log("Error check your internet connection.")
        })
  }
}