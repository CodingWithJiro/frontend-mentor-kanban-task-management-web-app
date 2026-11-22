interface ShowPasswordButtonProps {
  name: 'password' | 'confirmPassword';
  label: string;
  handlePasswordVisibilityToggle: (
    field: 'password' | 'confirmPassword',
  ) => void;
  passwordVisibility: {
    password: boolean;
    confirmPassword?: boolean;
  };
}

export default function ShowPasswordButton({
  name,
  label,
  handlePasswordVisibilityToggle,
  passwordVisibility,
}: ShowPasswordButtonProps) {
  return (
    <button
      type="button"
      onClick={() => handlePasswordVisibilityToggle(name)}
      aria-controls={name}
      aria-label={
        passwordVisibility[name]
          ? `Hide ${label.toLowerCase()}.`
          : `Show ${label.toLowerCase()}.`
      }
      className="text-heading-s text-medium-gray hover:bg-background hover:text-main-purple focus-visible:outline-main-purple focus-visible:text-main-purple absolute top-3 right-2 cursor-pointer rounded-full px-2 py-1 font-bold outline-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      {passwordVisibility[name] ? 'Hide' : 'Show'}
    </button>
  );
}
