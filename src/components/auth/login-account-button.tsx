export default function LoginAccountButton() {
  return (
    <div className="relative">
      <button
        type="submit"
        className={`hover:bg-main-purple-hover text-body-l focus-visible:outline-main-purple bg-main-purple mb-4 w-full cursor-pointer rounded-[20px] px-4 py-2 font-bold text-white outline-offset-4 outline-transparent transition-colors focus-visible:outline-2`}
      >
        Log In
      </button>
    </div>
  );
}
