import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요.'),
})

type LoginFormData = z.infer<typeof loginSchema>

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('로그인 데이터:', data)
    setIsSubmitted(true)
  }

  return (
    <main className="page">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>로그인</h1>
        <p className="description">이메일과 비밀번호를 입력해주세요.</p>

        <div className="field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="8자 이상 입력"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="error">
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '제출'}
        </button>

        {isSubmitted && <p className="success">로그인 정보가 제출되었습니다.</p>}
      </form>
    </main>
  )
}

export default App
