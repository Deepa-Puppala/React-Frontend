Created a Simple Application for Employee management. This project is a frontend application built using React and TypeScript, with Vite as the build tool. The project includes various components for managing employees, such as forms for editing and listing employees. The application leverages modern React features like hooks and context to manage state and functionality.

Concepts Covered:
1.	React Hooks
2.	Axios
3.	Interceptors
4.	HOC
5.	Lazy Loading
6.	Micro frontend
7.	Form validations with React-form-hook
8.	Redux for state management
9.	Also used useContext for state management
10.	Error route for invalid route paths
11.	Folder Structure
Folder structure
src/: Contains the main source code for the application.
•	assets/: Contains static assets like images.
•	components/: Contains React components used in the application.
o	EditEmployee.tsx: Component for editing employee details.
o	EditEmployee.scss: Styling for the EditEmployee component.
o	EmployeeForm.tsx: Component for the employee form.
o	EmployeeList.tsx: Component for displaying a list of employees.
o	EmployeeList.scss: Styling for the EmployeeList component.
•	apiClient.tsx: Contains API client configuration and functions.
•	App.tsx: Main application component.
•	main.tsx: Entry point for the React application.
•	App.css, index.css: Global styles for the application.
useState :
The useState hook in React is a fundamental tool for managing state within functional components. In this project, the useState hook is used to keep track of the state of various components, allowing them to respond to user interactions and other events by updating the component's state and triggering a re-render.
Managing Form Inputs: In components like EmployeeForm.tsx and EditEmployee.tsx, the useState hook is likely used to manage the state of form inputs. This allows the component to update the input fields as the user types and to handle form submission.
Fetching and Displaying Data: The useState hook can be used in combination with useEffect to fetch data from an API and display it in the component. For example, EmployeeList.tsx might use useState to store a list of employees fetched from an API.

  const [name, setName] = useState("");
  const [employeetype, setemployeetype] = useState("");
  const [industry, setIndustry] = useState("");
 
we can also declare it as an object

interface FormData{
  name: string;
  employeetype: string;
  industry: string;
}
  const [formData, setFormData] = useState<FormData>({
    name:'',
    employeetype: '',
    industry: ''
  })

useEffect:
The useEffect hook in React is used to handle side effects in functional components. Side effects include operations like data fetching, subscriptions, or manually changing the DOM, which are not performed during the render phase. In this project, useEffect likely serves several important purposes:
Data Fetching: useEffect is commonly used to fetch data from an API when a component mounts. For example, in a component that displays a list of employees, useEffect would be used to make an API call to fetch the employees' data when the component is first rendered.
Updating Component State Based on Props or Other State: useEffect can be used to update component state in response to changes in props or other state variables. This makes it possible to react to changes and perform necessary updates or side effects.

  useEffect(() => {
    if (isEdit && employee) {
      // Populate form fields with employee data when in edit mode
      setName(employee.name);
      setemployeetype(employee.employeetype);
      setIndustry(employee.industry);
    }
  }, [isEdit, employee]);


UseCallback:
useCallback is a React hook that returns a memoized version of a callback function. It is useful for optimizing performance, particularly in components that rely on complex or expensive computations or in scenarios where passing functions as props can lead to unnecessary re-renders.
Prevent Unnecessary Re-renders: When a parent component re-renders, its children also re-render by default. If child components rely on functions passed as props, using useCallback helps ensure that these functions are not recreated on every render, preventing unnecessary re-renders of child components. 
Passing Functions to Child Components: If a child component depends on a function passed as a prop, memoizing the function with useCallback can prevent the child from re-rendering unnecessarily.
const fetchData = useCallback(async () => {
    apiClient
      .get("/api/getAll")
      .then((response) => {
        setEmployeesList(() => ({
          employees: [...response.data],
        }));
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, [alter]);

useMemo :
useMemo is a React hook that memoizes the result of a computation, preventing expensive calculations on every render unless one of its dependencies changes. It is useful for optimizing performance, especially when dealing with complex calculations or operations that need to be performed only when certain dependencies change.
Optimize Performance, Prevent Unnecessary Recalculations
 const errorData = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      return error.statusText;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return null;
  }, [error]);


HOC:
A HOC is a function that takes a component and returns a new component, often enhancing or altering the behavior of the original component.
Reuse Code, Logic, and Bootstrap Abstractions
Enhance Components
const withContextUserList =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => {
    const userContext = useUserContext();
    return <Component {...props} userContext={userContext} />;
  };

export default withContextUserList;

Axios:
Axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. It is promise-based, making it easy to handle asynchronous operations in JavaScript. Here are some of the key features and benefits of using Axios:
•	Promise-Based: Works seamlessly with modern JavaScript async/await syntax.
•	Interceptors: Allows for setting up middleware logic for requests or responses.
•	Automatic Transformations: Automatically transforms JSON data.
•	Error Handling: Provides easy and consistent error handling.
•	Cancellation: Allows for request cancellation.
I have created Axios instance in apiClient.tsx file where I specified the url of the backend server aling with timeout and basic headers.
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // Add any headers you need for all requests
  },
});
Interceptors:
Interceptors in Axios allow you to run your code or modify the request/response before they are handled by then or catch. They are useful for a variety of tasks, including:
1.	Logging: Logging requests and responses.
2.	Global Error Handling: Handling errors globally instead of in each request.
3.	Request Transformation: Modifying request data or headers before sending the request.
4.	Response Transformation: Modifying response data before passing it to the application.
5.	Authentication: Attaching authentication tokens to requests.
6.	Retry Logic: Implementing retry logic for failed requests.

apiClient.interceptors.request.use(
  (config) => {
    console.log("config ", config);
    const token = getToken();
    const { url } = config;
    if (token && validateToken(token) && !url?.includes("register")) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.localStorage.clear();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


Lazy loading components:
Lazy loading is a technique in React that allows components to be loaded asynchronously when they are needed, rather than loading all components up front. This can improve the performance of the application by reducing the initial load time and only loading the components that are necessary for the current view.
Improve Initial Load Time
Optimize Resource Usage
Enhance User Experience
React provides a built-in way to handle lazy loading through the React.lazy function and the Suspense component.
  const EmployeeList = lazy(() => import("../EmployeeList/EmployeeList"));

   <Suspense fallback={<div>Loading...</div>}>
            <EmployeeList alter={alter} updateAlter={updateAlter} />
          </Suspense>

form validations with react form hook:
npm install react-hook-form
type FormValues = { firstName: string; lastName: string; email: string; password: string; };
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

 const onSubmitForm: SubmitHandler<RegisterFormData> = (data) => {
    apiClient
      .post("/auth/register", data)
      .then((response: any) => {
        console.log("response", response);
        alert("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.error("Registration failed:", error);
      });
  };


React with typescript
Using TypeScript with React provides many benefits, such as enhanced type checking, better code documentation, and improved developer experience with autocompletion and refactoring tools.
•	Define props types using an interface or type alias.
•	Use React.FC<Props> for functional components.
  import React from 'react';

type ListProps<T> = {
  items: T[];
  render: (item: T) => React.ReactNode;
};

const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default List;
Redux for state management
Redux is a popular state management library for JavaScript applications, often used with React. It helps manage the state of your application in a predictable way, making it easier to debug and test. Here's a step-by-step guide on how to set up and use Redux with React and TypeScript.
npm install @reduxjs/toolkit react-redux @types/react-redux
// Configure stores
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});			



interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser_Redux(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    deleteUser_Redux(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
  },
});

  <Provider store={store}>
      
        <App />
      </UserProvider>
    </Provider>

Custom Buttons by passing css properties through props
import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  variant?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<Props> = ({
  variant = "primary",
  size,
  disabled = false,
  onClick,
  children,
  type,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;


      <CustomButton variant="primary" type="submit" size="sm">
            Submit
          </CustomButton>


