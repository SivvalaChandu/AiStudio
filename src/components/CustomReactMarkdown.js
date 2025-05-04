import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CustomReactMarkdown = ({ content }) => (
  <div className="prose prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="mb-4 mt-6 block" {...props} />
        ),
        h2: ({ node, ...props }) => <h2 className="mb-3 mt-5" {...props} />,
        h3: ({ node, ...props }) => <h3 className="mb-2 mt-4" {...props} />,
        pre: ({ node, ...props }) => (
          <pre
            className="bg-slate-800/50 p-4 rounded-lg my-4 overflow-x-auto"
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code
            className="bg-slate-700/50 px-2 py-1 rounded text-sm font-mono whitespace-pre-wrap"
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th
            className="px-4 py-2 bg-slate-700/50 text-left border border-slate-600"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="px-4 py-2 border border-slate-700 whitespace-nowrap"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default CustomReactMarkdown;
