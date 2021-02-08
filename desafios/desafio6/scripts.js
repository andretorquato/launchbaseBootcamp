const Mask = {
    apply(input, func){
        setTimeout(() => {
            input.value = Mask[func](input.value);
        }, 1);
    },
    formatCPF(cpf){
        cpf = cpf.replace(/[^\d]/g, "");

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },
    formatPercent(value){
        value = value.replace(/\D/g, "");
        value= value/100;
        console.log(value);
        return format = new Intl.NumberFormat("pt-BR",{
            style:'percent',
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }).format(value/100);

        
    }
}

