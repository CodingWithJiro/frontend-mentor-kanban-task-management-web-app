import type { ZodSafeParseResult } from 'zod';

interface SignUpPasswordRulesProps {
  passwordRules: {
    errorMessage: string;
    rule: string;
  }[];
  passwordValidation: ZodSafeParseResult<string>;
  failedPasswordRules: string[];
  hasStartedTypingPassword: boolean;
}

export default function SignUpPasswordRules({
  passwordRules,
  passwordValidation,
  failedPasswordRules,
  hasStartedTypingPassword,
}: SignUpPasswordRulesProps) {
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
