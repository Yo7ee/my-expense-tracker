## React + TypeScript Expense Tracker

This project is intended to refresh my memory of React and learn TypeScript.

I found that using TypeScript encourages a more rigorous approach to parameter creation and passing. This deliberate consideration of types during development helps prevent bugs that might otherwise arise from JavaScript's dynamic typing.

Although my work environment uses Vue, I am using this project to demonstrate my cross-framework abilities.

## Core Learning Targets

### TypeScript

- Define type and interface: Define the `Transaction` interface to ensure data consistency from the mock API (localStorage) to the UI.
- Union type:
- Generics: Implement a generic API request utility to improve code reusability.

### React

- Performance Optimization:
  1. useMemo
  2. useCallback & React.memo: This is for a demo, since the render time is not that bad.
     - Triggered by dark mode
     - Result: Measured with React DevTools Profiler, the optimized render time was reduced from 8.7ms to 7.3ms (with a basic amount of data).

### React vs Vue

1. State & Computed

   ```javascript
   // React: Manually manage dependencies
   const [count, setCount] = useState(0);
   const doubled = useMemo(() => count * 2, [count]);

   // Vue: Automatically tracks dependencies
   const count = ref(0);
   const doubled = computed(() => count.value * 2);
   ```

2. Emits vs. Callbacks
   - React callback function

   ```jsx
   // Parent Component
   const Parent = () => {
   const handleUpdate = (val: string) => console.log(val);
   return <Child onUpdate={handleUpdate} />;
   };

   // Child Component
   interface Props {
   onUpdate: (val: string) => void;
   }

   const Child = ({ onUpdate }: Props) => {
   return <button onClick={() => onUpdate("Hello!")}>Update</button>;
   };
   ```

   - Vue defineEmits

   ```html
   <!-- Parent Component -->
   <template>
   	<Child @update="handleUpdate" />
   </template>

   <script setup>
   	const handleUpdate = (val) => console.log(val);
   </script>
   ```

   ```html
   <!-- Child Component -->
   <template>
   	<button @click="emit('update', 'Hello!')">Update</button>
   </template>

   <script setup>
   	const emit = defineEmits(["update"]);
   </script>
   ```

3. Lifecycle & Effects

   ```javascript
   // React: Control execution timing with the second argument `[]`
   useEffect(() => {
   	// Mounted logic
   	return () => {
   		/* Unmounted logic */
   	};
   }, []);
   ```

   ```javascript
   // Vue: Explicit lifecycle hooks
   onMounted(() => {
   	/* Mounted logic */
   });
   onUnmounted(() => {
   	/* Unmounted logic */
   });
   ```

4. Watchers

   ```javascript
   // React: Listen for specific state changes
   useEffect(() => {
   	console.log("Count changed:", count);
   }, [count]);
   ```

   ```js
   // Vue: Dedicated watch function
   watch(count, (newVal) => {
   	console.log("Count changed:", newVal);
   });
   ```

5. Global State

   ```javascript
   // React (Redux/Zustand): Explicitly select state
   const user = useSelector((state) => state.user);
   const name = user.name;
   ```

   ```js
   // Vue (Pinia): Directly destructure or use
   const userStore = useUserStore();
   const { name } = storeToRefs(userStore);
   ```
