import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'booking',
        name: 'Booking',
        component: () => import(/* webpackChunkName: "booking" */  '@/components/Booking.vue'),
      },
      {
        path: 'schedule-pasien/:practice_uuid',
        name: 'SchedulePasien', // Use PascalCase for the name
        component: () => import(/* webpackChunkName: "schedule-pasien" */  '@/components/scheduling-pasien.vue'),
      },
      // Uncomment and add more routes as needed
      // {
      //   path: 'about',
      //   name: 'About',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      // },
      // {
      //   path: 'doctor',
      //   name: 'Doctor',
      //   component: () => import(/* webpackChunkName: "doctor" */ '@/views/Doctor.vue'),
      // },
      // {
      //   path: 'blog',
      //   name: 'Blog',
      //   component: () => import(/* webpackChunkName: "blog" */ '@/views/Blog.vue'),
      // },
      // {
      //   path: 'contact',
      //   name: 'Contact',
      //   component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
