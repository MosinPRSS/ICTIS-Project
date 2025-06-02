import { useState } from "react"
import { useRegister } from "../../context/UserIsRegisteredContext"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import { Input } from "./input"
import { Label } from "./label"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {regFunc, wantRegFunc, theme, page} = useRegister()
  const [RegOrLog, setROL] = useState('log')

  const navigate = useNavigate()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={`${theme.options.regBgColor} ${theme.options.regTextColor}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Добро пожаловать!</CardTitle>
          <CardDescription>
            {RegOrLog == 'log' ? 'Войдите в свой аккаунт' : 'Регистрация'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Почта</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Введите почту"
                    className={`${theme.options.regHoverBgColor} ${theme.options.regHoverTextColor}`}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Пароль</Label>
                    {RegOrLog == 'log' ?
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Забыли пароль?
                      </a>
                    : <></>}
                  </div>
                  <Input id="password" type="password" className={`${theme.options.regHoverBgColor} ${theme.options.regHoverTextColor}`} placeholder="Введите пароль" required />
                </div>
                <Button 
                  type="submit" 
                  className={`w-full outline ${theme.options.regButtonColor} outline-black cursor-pointer ${theme.options.regHoverBgColor} ${theme.options.regHoverTextColor}`}
                  onClick={() => {
                    regFunc(true)
                    wantRegFunc(false)
                    localStorage.setItem('isReg', true)
                    navigate(page)
                  }}  
                >
                  {RegOrLog == 'log' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </div>
            </div>
          </form>
          {RegOrLog == 'log' ?
            <div className="text-center text-sm">
              Нет аккаунта?{" "}
              <Button onClick={() => setROL('reg')} className="cursor-pointer underline underline-offset-4">
                Регистрация
              </Button>
            </div> :
            <div className="text-center text-sm">
              Есть аккаунт?{" "}
              <Button onClick={() => {setROL('log')}} className="cursor-pointer underline underline-offset-4">
                Вход
              </Button>
            </div> }
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xm backdrop-blur-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Продолжая, вы соглашаетесь с <a href="#">Условиями</a>{" "}
        и <a href="#">Политикой конфиденциальности</a>.
      </div>
    </div>
  )
}
