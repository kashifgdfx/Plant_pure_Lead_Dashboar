
export default  function IconBtn({ icon: Icon }: { icon: typeof Globe }) {
  return (
    <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
      <Icon className="h-4 w-4" />
    </button>
  );
}