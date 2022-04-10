#lang racket
(require math/number-theory)

(define (first _list )
    (car _list)
)

(define (second _list )
    (car (cdr _list))
)

(define (third _list )
    (car (cdr (cdr _list)))
)
(first '(5 6 7 8))
(second '(5 6 7 8))
(third '(5 6 7 8))

(define (cmp3 _list1 _list2)
 (cond ((and (equal? (first _list1) (first _list2) )  (equal? (second _list1) (second _list2) ) (equal? (third _list1) (third _list2) ) )
   "equal")
)
)
(cmp3 '(5 6 7 8) '(5 6 7 8))


(define list_ '(1 2 3 4 5 6 7 8 9 10))

(filter odd? list_)
(filter even? list_)

(define (divides3? a )
  (if (divides? 3 a)
    #t
    #f
   )
)
(define (divides2? a)
    (if (divides? 2 a)
      #t
      #f
     )
 )
(define (divides2and3? a)
    (if (and (divides2? a) (divides3? a))
    #t
    #f
    )
)
(define (strangeCond a)
  (if (and (divides2? a) (< 10 (* a a)))
    #t
    #f
   )
)


(filter divides3? list_)
(filter divides2and3? list_)
(filter strangeCond list_)


(define nameList1 '("Elena" "Vasiliy"))
(define nameList2 '("Tumanova" "Vlasov"))
(define nameList3 '("Ivanova" "Petrovich"))

(car (cdr nameList1))

(map (lambda (name surname otch) (string-append name " " surname " " otch))nameList1 nameList2 nameList3)

(foldl + 0 list_)
(foldl + 0 (filter odd? list_))
(foldl + 0 (filter even? list_))
(apply - (filter odd? list_))

(define (last list_) (car (foldl cons '() list_)))
(last list_)
(cdr (foldl cons '() list_))
(foldl / (last list_) (cdr (foldl cons '() list_)))

(foldr / (car list_) (cdr list_))



(define (standart-search x set)
  (cond ((null? set) #f)
        ((= x (car set)) #t)
        ((not(= x (car set))) (standart-search x (cdr set)))))


(define (binary-search x set)
  (if (null? set) #f
  (if (standart-search x (list-tail set (quotient (length set) 2))) #t 
    (binary-search x (list-tail (reverse set) (- (length set) (quotient (length set) 2))))
    )
  )
  )

(standart-search 6 list_)


(quotient 15 2)

(define list___ '(1 2 3 4 5 6 7 8 9 10))
(binary-search 6 list___)





(define (use-maps conditions list out-list)
    (append (map (car conditions) list) out-list)
   )

(use-maps (list even? negative? positive? real?) '(25 -3 0 2) '(1 2 3))
