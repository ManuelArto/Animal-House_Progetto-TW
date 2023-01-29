<script>
    import "../../assets/ProfilePage.css"	
</script>

<div class="flex-auto p-6">
    <form>
        <h6 class="text-gray-700 text-xs mb-4">
            USER INFORMATION
        </h6>
        <div class="lg:pl-6">
            <div class="flex flex-wrap">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="input-username"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="lucky.jesse"
                            disabled
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-email">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="input-email"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="jesse@example.com"
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label  class="text-sm mb-2 font-bold text-cyan-900" for="input-full-name">
                            Full name
                        </label>
                        <input
                            type="text"
                            id="input-full-name"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="Jessica Jones"
                            disabled
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-date">
                            Date of birth
                        </label>
                        <input
                            type="date"
                            id="input-date"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="1993-06-24"
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap ">
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-phone">
                            Telefono
                        </label>
                        <input
                            type="tel"
                            id="input-phone"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="3331234567"
                            disabled
                        />
                    </div>
                </div>
                <div class="lg:w-1/2 pr-4 pl-4">
                    <div class="mb-4 focused">
                        <label class="text-sm mb-2 font-bold text-cyan-900" for="input-preference">
                            Preferenze
                        </label>
                        <input
                            type="text"
                            id="input-preference"
                            class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                            value="Cani e pesci"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>