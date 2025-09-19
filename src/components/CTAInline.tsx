import { useState, Suspense } from "react";

type Props = {
  /** e.g., "blog:free-things-to-do" — used for attribution in the email payload */
  source?: string;
};

function Loader() {
  return <div className="p-6 text-slate-600">Loading…</div>;
}

const LazyModalLoader = ({ source }: Props) => {
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);
  const [open, setOpen] = useState(false);

  const onOpen = async () => {
    // tag the source globally so the modal can read it without props drilling
    if (source) (window as any).__HPG_FORM_SOURCE__ = source;

    if (!Comp) {
      const m = await import("./FormModal"); // code-split the modal
      setComp(() => m.FormModal);
    }
    setOpen(true);
  };

  return (
    <>
      <div className="mt-12 mb-16 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">

        <p className="text-slate-700">
          Are you a local business? <strong>Feature your business</strong> on Hidden PG.
        </p>
        <button onClick={onOpen} className="btn-3d btn-3d-emerald btn-3d-md btn-3d-text">
  Open form
</button>


      </div>

      {open && Comp ? (
        <Suspense fallback={<Loader />}>
          <Comp onClose={() => setOpen(false)} />
        </Suspense>
      ) : null}
    </>
  );
};

export default function CTAInline(props: Props) {
  return <LazyModalLoader {...props} />;
}
