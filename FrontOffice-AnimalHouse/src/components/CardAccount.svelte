<script setup lang="ts">
    import "../views/Account.css"	
</script>
<div
class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900 bg-white border-0"
>
<div class="flex flex-wrap  items-center">
    <div class="w-2/3">
        <h3 class="mb-0">My account</h3>
    </div>
</div>
</div>
<div class="flex-auto p-6">
<form>
    <h6 class="heading-small text-gray-700 mb-4">
        User information
    </h6>
    <div class="lg:pl-6">
        <div class="flex flex-wrap ">
            <div class="lg:w-1/2 pr-4 pl-4">
                <div class="mb-4 focused">
                    <label
                        class="form-control-label"
                        for="input-username"
                        >Username</label
                    >
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
                    <label
                        class="form-control-label"
                        for="input-email"
                        >Email address</label
                    >
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
                    <label
                        class="form-control-label"
                        for="input-first-name"
                        >Full name</label
                    >
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
                    <label
                        class="form-control-label"
                        for="input-last-name"
                        >Date of birth</label
                    >
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
                    <label
                        class="form-control-label"
                        for="input-first-name"
                        >Telefono</label
                    >
                    <input
                        type="number"
                        id="input-phone"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="3331234567"
                        disabled
                    />
                </div>
            </div>
            <div class="lg:w-1/2 pr-4 pl-4">
                <div class="mb-4 focused">
                    <label
                        class="form-control-label"
                        for="input-last-name"
                        >Preferenze</label
                    >
                    <input
                        type="text"
                        id="input-pref"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="Cani e pesci"
                        disabled
                    />
                </div>
            </div>
        </div>
    </div>
    <hr />
    <!-- Address -->
    <h6 class="heading-small text-gray-700 mb-4">
        Contact information
    </h6>
    <div class="lg:pl-6">
        <div class="flex flex-wrap ">
            <div class="md:w-full pr-4 pl-4">
                <div class="mb-4 focused">
                    <label
                        class="form-control-label"
                        for="input-address"
                        >Address</label
                    >
                    <input
                        id="input-address"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                        type="text"
                        disabled
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-wrap ">
            <div class="lg:w-1/3 pr-4 pl-4">
                <div class="mb-4 focused">
                    <label
                        class="form-control-label"
                        for="input-city">City</label
                    >
                    <input
                        type="text"
                        id="input-city"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="New York"
                        disabled
                    />
                </div>
            </div>
            <div class="lg:w-1/3 pr-4 pl-4">
                <div class="mb-4 focused">
                    <label
                        class="form-control-label"
                        for="input-country"
                        >Country</label
                    >
                    <input
                        type="text"
                        id="input-country"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="United States"
                        disabled
                    />
                </div>
            </div>
            <div class="lg:w-1/3 pr-4 pl-4">
                <div class="mb-4">
                    <label
                        class="form-control-label"
                        for="input-country"
                        >Postal code</label
                    >
                    <input
                        type="number"
                        id="input-postal-code"
                        class="block appearance-none w-full py-1 px-2 mb-1 bg-white text-gray-500 border border-stone-300 rounded"
                        value="40011"
                        disabled
                    />
                </div>
            </div>
        </div>
    </div>
</form>
</div>