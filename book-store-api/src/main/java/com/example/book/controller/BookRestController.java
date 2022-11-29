package com.example.book.controller;

import com.example.book.dTo.*;
import com.example.book.entity.*;
import com.example.book.repository.BookRepository;
import com.example.book.service.*;
import freemarker.template.TemplateException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/book")
public class BookRestController {

    @Autowired
    private IBookService iBookService;
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private IUserService iUserService;

    @Autowired
    private ICartDetailService iCartDetailService;

    @Autowired
    private ICartService cartService;

    @Autowired
    private IUserService userService;

    @GetMapping("/list")
    public ResponseEntity<Page<Book>> getCategoryVn(@RequestParam(defaultValue = "", required = false) String name,
                                                    @RequestParam(defaultValue = "0", required = false) Integer idCategory,
                                                    @PageableDefault(value = 8) Pageable pageable) {
        Page<Book> listVn = iBookService.FindAll(idCategory, name, pageable);
        if (listVn.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listVn, HttpStatus.OK);
    }

    @GetMapping("/list/show/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") Integer id) {
        Optional<Book> book = iBookService.findById(id);
        if (book == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createBook(@RequestBody BookDto bookDto) {
        Book book = new Book();
        BeanUtils.copyProperties(bookDto, book);
        iBookService.create(book);
        return new ResponseEntity<>(bookDto, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") Integer id, @RequestBody BookDto bookDto) {
        Optional<Book> bookUpdate = iBookService.findById(id);
        if (bookUpdate == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Book books = new Book();
        BeanUtils.copyProperties(bookDto, books);

        books.setId(bookUpdate.get().getId());
        books.setCategory(bookUpdate.get().getCategory());

        iBookService.update(books);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExport(@PathVariable Integer id) {
        iBookService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{username}")
    public ResponseEntity<Customer> findByUsername(@PathVariable String username) {
        Customer customer = iCustomerService.findByUsername(username);
        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Customer>> getAll() {
        List<Customer> customers = iCustomerService.findAll();
        if (customers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping("saveHistory/{username}")
    public ResponseEntity<List<CartDetailDto>> saveHistory(@PathVariable String username, @RequestBody List<CartDetail> cartDetails) throws MessagingException, IOException, TemplateException {
        Customer customer = iCustomerService.findByUsername(username);
        Cart cart = new Cart();
        cart.setDateCreate(LocalDate.now());
        cart.setCustomer(customer);
        cart = cartService.save(cart);
        for (CartDetail item : cartDetails) {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(item.getBook());
            cartDetail.setQuantity(item.getQuantity());
            iCartDetailService.save(cartDetail);
        }
        iUserService.paypalDone(cart, cartDetails );
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @GetMapping("history/{username}")
    public ResponseEntity<HistoryDto> getHistory(@PathVariable String username) {
        HistoryDto historyDto = new HistoryDto();
        Customer customer = iCustomerService.findHistoryByUsername(username);
        BeanUtils.copyProperties(customer, historyDto);
        List<Cart> cartList = cartService.findByCustomerId(historyDto.getId());
        List<CartDto> cartDtoList = new LinkedList<>();
        for (Cart cart : cartList) {
            cartDtoList.add(new CartDto(cart.getDateCreate().toString(), cart.getId()));
        }
        System.out.println();
        historyDto.setCartList(cartDtoList);
        for (CartDto cart : historyDto.getCartList()) {
            List<CartDetail> cartDetailList = iCartDetailService.findCartDetail(cart.getId());
            List<CartDetailDto> cartDetailDtoList = new LinkedList<>();
            for (CartDetail cartDetail : cartDetailList) {
                cartDetailDtoList.add(new CartDetailDto(cartDetail.getQuantity(), cartDetail.getBook()));
            }
            cart.setCartDetailList(cartDetailDtoList);
        }
        return new ResponseEntity<>(historyDto, HttpStatus.OK);
    }

    @PostMapping("saveCart/{username}")
    public ResponseEntity<List<CartDetailDto>> saveCart(@PathVariable String username, @RequestBody List<CartDetailDto> list) {
        Customer customer = iCustomerService.findByUsername(username);
        Cart cart = cartService.findCart(customer.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setDateCreate(LocalDate.now());
            cart.setCustomer(customer);
            cart.setStatus(true);
            cart = cartService.save(cart);
        } else {
            iCartDetailService.deleteCartDetailByCartId(cart.getId());
        }
        for (CartDetailDto item : list) {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(cart);
            cartDetail.setBook(item.getBook());
            cartDetail.setQuantity(item.getQuantity());
            iCartDetailService.save(cartDetail);
        }
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @GetMapping("cart/{username}")
    public ResponseEntity<List<CartDetailDto>> getCart(@PathVariable String username) {
        Customer customer = iCustomerService.findHistoryByUsername(username);
        Cart cartList = cartService.findCart(customer.getId());
        List<CartDetail> cartDetailList = iCartDetailService.findCartDetail(cartList.getId());
        List<CartDetailDto> cartDetailDtoList = new LinkedList<>();
        for (CartDetail cartDetail : cartDetailList) {
            cartDetailDtoList.add(new CartDetailDto(cartDetail.getQuantity(), cartDetail.getBook()));
        }
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }

    //đăng ký tài khoản

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostMapping("/customer/create")
    public ResponseEntity<List<FieldError>> create(@RequestBody CustomerDto customerDto) {

        AppUserDto appUserDto = customerDto.getAppUserDto();

        AppUser user = new AppUser();

        BeanUtils.copyProperties(appUserDto, user);

        user.setPassword(passwordEncoder().encode(user.getPassword()));

        iUserService.save(user);
        AppUser appUser = iUserService.findById(iUserService.findMaxId()).get();
        Customer customer = new Customer();

        BeanUtils.copyProperties(customerDto, customer);
        customer.setAppUser(appUser);
        iCustomerService.create(customer);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("topBook/{start}/{end}")
    public ResponseEntity<List<IBookDto>> getTopBook(@PathVariable("start") String startDate, @PathVariable("end") String endDate) {
        return new ResponseEntity<>(iBookService.findTopByBook(startDate, endDate), HttpStatus.OK);
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> addNewUser(@RequestBody AppUser appUser) {
        iUserService.saveGmail(appUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/customer/createGmail")
    public ResponseEntity<List<?>> createGmail(@RequestBody Customer customer) {
        iCustomerService.createGmail(customer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/appUser")
    public ResponseEntity<List<AppUser>> getAllUser() {
        List<AppUser> appUsers = iUserService.findAll();
        if (appUsers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }

    @PostMapping("/sendemail")
    public ResponseEntity<?> reset(@RequestBody JwtRequest authenticationRequest) throws MessagingException, UnsupportedEncodingException, MessagingException {
        if (userService.existsByUserName(authenticationRequest.getUsername()) != null) {
            return ResponseEntity.ok(new MessageResponse("Sent email "));
        }
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Tài khoản không đúng"));
    }

}
