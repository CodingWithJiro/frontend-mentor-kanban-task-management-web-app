import useSignUpForm from '@/hooks/use-sign-up-form';

export default function SignUpPasswordRules() {
  const {
    passwordRules,
    passwordValidation,
    failedPasswordRules,
    hasStartedTypingPassword,
  } = useSignUpForm();

  return (
    <ul
      id="password-error"
      className="bg-background mx-auto mt-2 -mb-2 grid grid-cols-2 items-center gap-x-2 gap-y-2 rounded-md p-4 transition-colors"
    >
      {passwordRules.map(({ errorMessage, rule }) => {
        const isSatisfied =
          passwordValidation.success ||
          !failedPasswordRules.includes(errorMessage);
        const ruleColor =
          isSatisfied && hasStartedTypingPassword
            ? 'text-main-purple'
            : 'text-medium-gray';
        return (
          <li key={rule} className={`text-body-m font-medium ${ruleColor}`}>
            {rule}
          </li>
        );
      })}
    </ul>
  );
}
