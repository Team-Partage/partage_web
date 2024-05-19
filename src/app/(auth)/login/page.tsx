'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const inputStyle =
  'border-none bg-gray-500 text-foreground-high placeholder:text-foreground-medium';

const LoginPage = () => {
  const form = useForm();

  const handleSubmit = () => {
    console.log('first');
  };

  return (
    <Card className="w-[480px] bg-gray-700 text-foreground-high">
      <CardHeader>
        <CardTitle className="m-auto">Partage</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className={inputStyle} placeholder="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className={inputStyle} placeholder="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-6 w-full bg-primary-default text-gray-900 body-large-1 hover:bg-primary-hover"
            >
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
