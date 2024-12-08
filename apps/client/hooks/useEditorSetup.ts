import { useCallback, useRef } from "react";
import { languageSetup } from "@/utils/languageSetup";
import * as monacoEditor from "monaco-editor";

const isLanguageRegistered = { value: false };

export const useEditorSetup = () => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null,
  );

  const handleEditorDidMount = useCallback(
    (
      editor: monacoEditor.editor.IStandaloneCodeEditor,
      monaco: typeof monacoEditor,
    ) => {
      editorRef.current = editor;

      if (!isLanguageRegistered.value && monaco) {
        monaco.languages.register({ id: "sql1" });
        monaco.languages.setMonarchTokensProvider("sql1", languageSetup);
        monaco.editor.defineTheme("customTheme", {
          base: "vs",
          inherit: false,
          rules: [
            { token: "keyword.sql", foreground: "007ACC", fontStyle: "bold" },
            { token: "operator.sql", foreground: "C586C0" },
            { token: "builtinFunctions.sql", foreground: "4EC9B0" },
            { token: "variable.sql", foreground: "FF4500" },
            { token: "delimiter.parenthesis.sql", foreground: "AA5500" },
            { token: "string.sql", foreground: "FF0000" },
            { token: "comment.sql", foreground: "00AA00", fontStyle: "italic" },
            {
              token: "identifier.sql",
              foreground: "000000",
              fontStyle: "bold",
            },
          ],
          colors: {
            "editor.foreground": "#000000",
          },
        });

        monaco.languages.registerCompletionItemProvider("sql1", {
          provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            };

            const suggestions = languageSetup.keywords
              .concat(
                languageSetup.operators,
                languageSetup.builtinFunctions,
                languageSetup.builtinVariables,
              )
              .map((keyword: string) => ({
                label: keyword,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: keyword.toUpperCase(),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
              }));

            return { suggestions };
          },
          triggerCharacters: [" ", ".", ",", "(", "'"],
        });

        isLanguageRegistered.value = true;

        editor.updateOptions({
          theme: "customTheme",
        });
      }
    },
    [],
  );

  return {
    editorRef,
    handleEditorDidMount,
  };
};
