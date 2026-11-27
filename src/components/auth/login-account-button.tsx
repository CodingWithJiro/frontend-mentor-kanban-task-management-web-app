interface LoginAccountButtonProps {
  isSubmitting: boolean;
  serverError: string;
}

export default function LoginAccountButton({
  isSubmitting,
  serverError,
}: LoginAccountButtonProps) {
  return (
    <div className="relative">
      <button
        type="submit"
        className={`hover:bg-main-purple-hover text-body-l focus-visible:outline-main-purple ${isSubmitting ? 'bg-medium-gray hover:bg-medium-gray cursor-not-allowed' : 'bg-main-purple cursor-pointer'} mb-4 w-full rounded-[20px] px-4 py-2 font-bold text-white outline-offset-4 outline-transparent transition-colors focus-visible:outline-2`}
        aria-busy={isSubmitting}
        disabled={isSubmitting}
      >
        {`${isSubmitting ? 'Logging in...' : 'Log In'}`}
      </button>
      {serverError && (
        <p
          role="alert"
          className="text-heading-s text-red absolute -top-5 left-2 font-bold transition-colors"
        >{`Log in failed. ${serverError}`}</p>
      )}
    </div>
  );
}
