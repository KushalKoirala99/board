import Todo from './Todo';
import {render,screen } from '@testing-library/react'


test('should add a new task',async ()=> {
    render(<Todo/>);
})

test('should add a new task', async () => {
    render(<Todo />);
  
    const inputElement = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add Task');

    await userEvent.type(inputElement, 'New Task');
    userEvent.click(addButton);
  
    await waitFor(() => screen.getByText('New Task'));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });