import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertSandpack,
  InsertTable,
  ListsToggle,
  MDXEditor,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  const defaultSnippetContent = `
  export default function App() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
  `.trim()

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'dark',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent
      }
    ]
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      className="dark-theme dark-editor"
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve('https://picsum.photos/200/300')
          },
          imageAutocompleteSuggestions: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200'
          ]
        }),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' }
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  when: (editor) => editor?.editorType === 'sandpack',
                  contents: () => <ShowSandpackInfo />
                },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                      <InsertSandpack />
                      <InsertTable />
                      <CreateLink />
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertImage />
                      <ListsToggle />
                    </>
                  )
                }
              ]}
            />
          )
        })
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
