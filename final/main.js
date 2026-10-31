let members = [
    {
        memberCode: "GYM-001",
        fullName: "Hoàng Văn Nam",
        packageName: "Gói Cơ Bản",
        age: 22,
        monthCount: 3
    },
    {
        memberCode: "GYM-002",
        fullName: "Lý Thị Mai",
        packageName: "Gói Yoga",
        age: 30,
        monthCount: 6
    },
    {
        memberCode: "GYM-003",
        fullName: "Bùi Đức Anh",
        packageName: "Gói Thể Hình Nâng Cao",
        age: 27,
        monthCount: 12
    }
];

const validateMemberCode = (code) => {
    if (!code || code.trim() === ""){
        return "mã không được để trống";
    }

    let formattedCode = code.trim().toUpperCase();

    if(formattedCode.length < 6){
        return "mã phải lớn hơn 6 ký tự";
    }

    if(!formattedCode.startsWith("GYM-")){
        return "mã phải bắt đầu bằng GYM-";
    }

    if(formattedCode.includes(" ")){
        return "mã không được chứa khoảng trắng";
    }

    for (let i = 0; i < members.length; i++) {
        if(members[i].memberCode === formattedCode){
            return "mã đã tồn tại";
        }
    }

    return "";
}

const findMemberIndex = (code) => {
    let searchCode = code.trim().toUpperCase();
    for (let i = 0; i < members.length; i++) {
        if(members[i].memberCode === searchCode){
            return i;
        }
    }

    return -1;
}

const inputInteger = (message) => {
    while (true) {
        input = prompt(message);

        if(input === null){
            return null;
        }

        let trim = input.trim();
        let num = Number(trim);

        if(trim !== "" && Number.isInteger(num) && num > 0){
            return num;
        }

        console.log("nhập số nguyên lớn hơn 0");
    }
} 

const displayMembers = (list) => {
    if(list.length === 0){
        console.log("danh sách hội viên trống");
    } else {
        for (let i = 0; i < list.length; i++) {
            console.log(`${i+1}. ${list[i].memberCode} - ${list[i].fullName} - ${list[i].packageName}
                Tuổi: ${list[i].age}| số tháng đăng ký: ${list[i].monthCount}
            `);
        }

        console.log(`tổng ${list.length} hội viên`);
    }
}

const handleCreateMember = () => {
    codeInput = prompt("nhập mã hội viên mới: ");
    if (codeInput === null){
        return;
    }

    let errMsg = validateMemberCode(codeInput);
    if(errMsg !== ""){
        console.log(errMsg);
        return;
    }

    let fullName = "";
    while (true) {
        fullName = prompt("nhập tên hội viên mới: ")

        if(fullName.trim() !== ""){
            let word = fullName.trim().split(" ");
            let temp = [];
            for (let i = 0; i < word.length; i++) {
                let w = word[i].trim().toLowerCase();
                temp.push(w.charAt(0).toUpperCase() + w.slice(1));
            }

            fullName = temp.join(" ");
            break;
        }

        console.log("tên không hợp lệ");
    }
    
    let packageName = "";
    while (true) {
        packageName = prompt("nhập gói hội viên mới: ")
        if(packageName === null){
            return;
        }

        if(packageName.trim() !== ""){
            let word = packageName.trim().split(" ");
            let temp = [];
            for (let i = 0; i < word.length; i++) {
                let w = word[i].trim().toLowerCase();
                temp.push(w.charAt(0).toUpperCase() + w.slice(1));
            }

            packageName = temp.join(" ");
            break;
        }

        console.log("tên không hợp lệ");
    }

    let age = inputInteger("nhập tuổi hội viên: ");
    if(age === null){
        return;
    }

    let monthCount = inputInteger("nhập số tháng hội viên đăng ký: ");
    if(monthCount === null){
        return;
    }

    let newMember = {
        memberCode: codeInput.trim().toUpperCase(),
        fullName: fullName,
        packageName: packageName,
        age: age,
        monthCount: monthCount
    }

    members.push(newMember);

    console.log("=".repeat(50));
    console.log("HỘI VIÊN MỚI");
    console.log("=".repeat(50));
    console.log(`mã hội viên: ${newMember.memberCode}`);
    console.log(`tên hội viên: ${newMember.fullName}`);
    console.log(`gói đăng ký: ${newMember.packageName}`);
    console.log(`tuổi: ${newMember.age}`);
    console.log(`số tháng đăng ký: ${newMember.monthCount}`);
    console.log("=".repeat(50));
    console.log("ĐĂNG KÝ THÀNH CÔNG");
}

const handleUpdateMember = () => {
    let codeInput = prompt("nhập mã hội viên muốn cập nhật: ");
    if(codeInput === null || codeInput.trim() === ""){
        console.log("mã không được trống");
        return;
    }

    let index = findMemberIndex(codeInput);
    if(index === -1){
        console.log("không tìm thấy mã");
        return
    }
    
    let oldAge = members[index].age;
    let oldMonth = members[index].monthCount;

    let newAge = inputInteger("nhập tuổi mới: ");
    if(newAge === null){
        return;
    }

    let newMonth = inputInteger("nhập tháng mới: ");
    if(newMonth === null){
        return;
    }

    members[index].age = newAge;
    members[index].monthCount = newMonth;

    console.log(`tuổi/ tháng cũ: ${oldAge}/ ${oldMonth}`);
    console.log(`tuổi/ tháng mới: ${newAge}/ ${newMonth}`);
    console.log("cập nhật thành công");
}

const handleDeleteMember = () => {
    let codeInput = prompt("nhập mã hội viên muốn xóa: ");
    if(codeInput === null) {
        return;
    }

    let index = findMemberIndex(codeInput);
    if(index === -1){
        console.log("không tìm thấy mã");
        return
    }

    let confirmChoice = prompt("bạn có chắc muốn xóa không (Y/N): ");
    if(confirmChoice !== null && confirmChoice.toUpperCase() === "Y"){
        members.splice(index, 1);
        console.log(`xóa thành công còn ${members.length} hội viên`);
    }else {
        console.log("đã hủy thao tác");
    }
    
}

const handleSearchMember = () => {
    let searchPackage = prompt("nhập gói tập muốn tìm: ");
    if(searchPackage === null){
        return;
    }

    let keyWord = searchPackage.trim().toLowerCase();
    let package = []

    for (let i = 0; i < members.length; i++) {
        if(members[i].packageName.toLowerCase().includes(keyWord)){
            package.push(members[i]);
        }
    }

    if(package.length === 0){
        console.log("không tìm thấy gói phù hợp");
    }else {
        displayMembers(package);
    }
}

const runSystem = () => {
    let choice;
    do {
        choice = +prompt(`
            ===========================================
            HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE
            ===========================================
            1. Hiển thị danh sách hội viên
            2. Thêm hội viên mới
            3. Cập nhật thông tin hội viên
            4. Xóa hội viên
            5. Tìm kiếm hội viên theo gói tập
            0. Thoát chương trình 
            ===========================================
            Vui lòng nhập lựa chọn của bạn (0-5): 
            `)

        switch (choice) {
            case 1:
                displayMembers(members);
                break;
            case 2:
                handleCreateMember();
                break;
            case 3:
                handleUpdateMember();
                break;
            case 4:
                handleDeleteMember();
                break;
            case 5:
                handleSearchMember();
                break;
            case 0:
                if(members.length === 0){
                    console.log("chưa có hội viên nào");
                }else {
                    console.log("=".repeat(50));
                    console.log("BÁO CÁO TỔNG KẾT HỘI VIÊN");
                    console.log("=".repeat(50));
                    console.log(`tổng số hội viên: ${members.length}`);
                    let avgAge = 0;
                    for (let i = 0; i < members.length; i++) {
                        avgAge += members[i].age;
                    }
                    console.log(`tuổi trung bình: ${avgAge/members.length}`);
                    console.log("=".repeat(50));
                }
                break;
            default:
                console.log("lựa chọn không hợp lệ, vui lòng chọn lại");
                break;
        }
        
    } while (choice !== 0);
}

runSystem();