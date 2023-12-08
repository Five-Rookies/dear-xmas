import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string,
)

export const userSignUp = async (
  email: string,
  password: string,
  option: object,
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: option,
      },
    })

    if (error) return console.error(error)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export const userSignIn = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return console.error(error)
    console.log(data)
    alert(`로그인 완료\n${data.user.email}`)
  } catch (error) {
    console.error(error)
  }
}

export const userSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) return console.log(error)
    alert(`로그아웃 완료`)
  } catch (error) {
    console.log(error)
  }
}
