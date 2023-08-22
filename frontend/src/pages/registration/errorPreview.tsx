import { ReactNode } from "react";

type Props = {
  msgs: string | string[];
  children?: ReactNode;
};

const ErrorPreview: React.FC<Props> = ({ msgs, children }) => {
  
  let Msgs = (typeof msgs === 'string' ? [msgs] : msgs).map((m) => (
    <p key={m}>{m}</p>
  ))

  return (
    <main>
      <section>
        <h1 className="text-2xl font-bold text-red-400 mt-10 sm:text-3xl">
          Error
        </h1>
        <div className="mt-4">
          {Msgs}
        </div>
        {children}
      </section>
    </main>
  );
};

export default ErrorPreview;
