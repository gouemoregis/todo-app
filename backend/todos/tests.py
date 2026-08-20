from rest_framework.test import APITestCase
from rest_framework import status

from .models import Todo


class TodoListApiTests(APITestCase):
    def test_get_todo_returns_list(self):
        Todo.objects.create(title="Test Todo")

        response = self.client.get('/api/todos/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Todo')

    def test_post_todo_creates_todo(self):
        payload = {
            'title': 'Todo created by test',
            'description': 'Created from API test',
            'completed': False,
        }

        response = self.client.post('/api/todos/', payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(Todo.objects.first().title, 'Todo created by test')

    def test_get_todo_detail_returns_todo(self):
        todo = Todo.objects.create(title='Detail todo')

        response = self.client.get(f'/api/todos/{todo.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], todo.id)
        self.assertEqual(response.data['title'], 'Detail todo')

    def test_get_todo_detail_returns_404_when_not_found(self):
        response = self.client.get('/api/todos/999999/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_todo_updates_todo(self):
        todo = Todo.objects.create(title='Todo to update', completed=False)

        payload = {
            'completed': True,
        }

        response = self.client.patch(f'/api/todos/{todo.id}/', payload, format='json')

        todo.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['completed'], True)
        self.assertEqual(todo.completed, True)

    def test_delete_todo_deletes_todo(self):
        todo = Todo.objects.create(title='Todo to delete')

        response = self.client.delete(f'/api/todos/{todo.id}/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)
