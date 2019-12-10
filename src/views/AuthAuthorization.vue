<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ 'invalid': ($v.email.$dirty && !$v.email.required)
              || ($v.email.$dirty && !$v.email.email) }">
        <label for="email">Email</label>
        <small
        v-if="$v.email.$dirty && !$v.email.required"
        class="helper-text invalid">
          Обязательное для заполнения поле
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">
          Введите корректный email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{ 'invalid': ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && $v.password.minLength < 6) }">
        <label for="password">Пароль</label>
        <small
        v-if="$v.password.$dirty && !$v.password.required"
        class="helper-text invalid">
          Введите пароль
        </small>
        <small
        v-else-if="$v.password.$dirty && $v.password.minLength < 6"
        class="helper-text invalid">
          Длина пароля не менее {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AuthAuthorization',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
      }

      console.log(formData)

      this.$router.push('/')
    },
  },
  data: () => ({
    email: '',
    password: '',
  }),
}
</script>
