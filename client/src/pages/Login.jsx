import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/feautures/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [signupInput, setsignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: RegisterisLoading,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginisLoading,
      isSuccess: isloginSuccess,
    },
  ] = useLoginUserMutation();
  //changing handler
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target; //each input have name
    if (type === "signup") {
      setsignupInput({ ...signupInput, [name]: value }); //so if name = password then it will update password value
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  //getting data

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegisterSuccess && registerData) {
      toast.success(registerData.message || "Registered Successfully");
    }
    if (isloginSuccess && loginData) {
      toast.success(loginData.message || "Logged in Successfully");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Failed to Register");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Failed to Login");
    }
  }, [
    registerData,
    loginData,
    registerError,
    loginError,
    isRegisterSuccess,
    isloginSuccess,
  ]);

  return (
    <div className="flex w-full justify-center items-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a New Account and Click Signup when done
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  id="tabs-demo-name"
                  type="text"
                  placeholder="Eg. Aakash"
                  required="true"
                />
                {/* //in react we cant use function with parameter in on change but we can use return functions */}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  id="tabs-demo-username"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="email"
                  placeholder="Eg. asg@gmail.com"
                  required="true"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  id="tabs-demo-username"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={RegisterisLoading}
                onClick={() => handleRegistration("signup")}
              >
                {RegisterisLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    PleaseWait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login with Your Password | After Signup u will be Logged in
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  id="tabs-demo-username"
                  type="email"
                  placeholder="Eg. asg@gmail.com"
                  required="true"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  id="tabs-demo-username"
                  type="password"
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginisLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginisLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    PleaseWait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
